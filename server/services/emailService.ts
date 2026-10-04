import nodemailer from 'nodemailer';

// You will need to configure your actual SMTP credentials in the .env file
// Example for Gmail: EMAIL_USER=your-email@gmail.com, EMAIL_PASS=your-app-password
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password',
  },
});

export async function sendTrackingEmail(order: any, trackingUrl: string) {
  const customerEmail = order.email;
  if (!customerEmail) {
    console.warn(`[EmailService] No customer email found for order ${order.orderId || order.id}`);
    return;
  }

  const billAmount = order.total_amount || 0;
  
  // Format the delivery address
  let addressText = 'Delivery Address Details Not Found';
  if (order.address || order.city) {
    addressText = `${order.address || ''}, ${order.city || ''}, ${order.state || ''} - ${order.pin || ''}`.replace(/^, | , | - $/g, '');
  }

  const orderIdDisplay = order.orderId || order.id || 'N/A';
  const customerName = order.customerName || 'Customer';

  const mailOptions = {
    from: `"Vastriya Tracking" <${process.env.EMAIL_USER || 'no-reply@vastriya.com'}>`,
    to: customerEmail,
    subject: `Your Tracking Link for Order #${orderIdDisplay} - Vastriya`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
        <h2 style="color: #4c0519;">Vastriya Order Tracking</h2>
        <p>Hello ${customerName},</p>
        <p>Great news! A tracking link has been generated for your recent order.</p>
        
        <div style="background-color: #fdf5f5; padding: 20px; border-radius: 12px; margin: 25px 0; border: 1px solid #fbe8e8;">
          <h3 style="margin-top: 0; color: #881337; font-size: 16px; border-bottom: 1px solid #fbe8e8; padding-bottom: 10px;">Order Details</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; width: 120px;">Order ID:</td>
              <td style="padding: 8px 0; font-weight: bold;">${orderIdDisplay}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;">Bill Amount:</td>
              <td style="padding: 8px 0; font-weight: bold;">₹${billAmount}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; vertical-align: top;">Delivery To:</td>
              <td style="padding: 8px 0;">${addressText}</td>
            </tr>
          </table>
        </div>

        <div style="text-align: center; margin-top: 35px; margin-bottom: 35px;">
          <a href="${trackingUrl}" style="background-color: #881337; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; box-shadow: 0 4px 6px -1px rgba(136, 19, 55, 0.2);">
            Track Your Order Status
          </a>
        </div>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="font-size: 0.85em; color: #94a3b8; text-align: center;">
          Thank you for shopping with Vastriya!<br>
          If you have any questions, please contact our support team.
        </p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[EmailService] Tracking email sent to ${customerEmail}: ${info.messageId}`);
  } catch (error) {
    console.error(`[EmailService] Failed to send tracking email to ${customerEmail}:`, error);
  }
}
