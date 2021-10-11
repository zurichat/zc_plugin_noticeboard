import requests
from django.conf import settings
from django.core.mail import EmailMessage, EmailMultiAlternatives, send_mass_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags


def sendmassemail(template, context, subject, to):
    subject, to = subject, to
    html_content = render_to_string(template, context)  # render with dynamic value
    text_content = strip_tags(
        html_content
    )  # Strip the html tag. So people can see the pure text at least.

    try:
        msg = EmailMultiAlternatives(subject=subject, to=[to])
        msg.attach_alternative(html_content, "text/html")
        msg.send(fail_silently=False)
        return True
    except Exception as e:
        print("There was an error sending an email: ", e)
        # error = {'message': ",".join(e.args) if len(e.args) > 0 else 'Unknown Error'}
        return False
        # raise serializers.ValidationError(error)


def subscription_success_mail(email):
    url = "https://api.zuri.chat/external/send-mail?custom_mail=1"
    payload = {
        "email": email,
        "subject": "Subscription Successful",
        "content_type": "text/html",
        "mail_body": '<div style="background-color: chocolate; width: 100%; height: 30%;"><h1 style="color: white; text-align: center; padding: 1em">Noticeboard Plugin</h2></div><div style="margin: 0% 5% 10% 5%;"><p>Hey!</p><br><p>You have successfully subscribed to receiving email notifications when there is a new notice on the Noticeboard Plugin.</p><p>We will keep you updated about notices.</p><br><p>Cheers,</p><p>Noticeboard Plugin</p><p><a href="https://zuri.chat/">zuri chat</a></p></div>',
    }
    response_email = requests.post(url=url, json=payload)
