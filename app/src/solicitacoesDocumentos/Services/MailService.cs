
using Microsoft.Extensions.Options;
using solicitacoesDocumentos.Interfaces.Service;
using solicitacoesDocumentos.Models;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace solicitacoesDocumentos.Services
{
    public class MailService : IMailService
    {
        private readonly EmailSettings _mailSettings;
        public MailService(IOptions<EmailSettings> emailSettings)
        {
            _mailSettings = emailSettings.Value;
        }
        public async Task SendEmailAsync(EmailRequest mailRequest)
        {
            MailMessage message = new MailMessage();
            SmtpClient smtp = new SmtpClient();

            message.From = new MailAddress(_mailSettings.Mail, _mailSettings.DisplayName);
            message.To.Add(new MailAddress(mailRequest.ToEmail));
            message.To.Add(new MailAddress("alesson@com.br"));
            message.Subject = mailRequest.Subject;

            message.IsBodyHtml = true;
            message.Body = mailRequest.Body;
            smtp.Port = _mailSettings.Port;
            smtp.Host = _mailSettings.Host;
            smtp.EnableSsl = false;
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new NetworkCredential(_mailSettings.MailUser, _mailSettings.Password);
            smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
            await smtp.SendMailAsync(message);
        }
    }
}
