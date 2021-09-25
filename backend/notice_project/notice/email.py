from django.core.mail import EmailMultiAlternatives, send_mass_mail, EmailMessage
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags


def sendmassemail(template, context, subject, to):
    subject, to = subject, to
    html_content = render_to_string(template, context) # render with dynamic value
    text_content = strip_tags(html_content) # Strip the html tag. So people can see the pure text at least.

    try:
        msg = EmailMultiAlternatives(subject=subject, to=[to])
        msg.attach_alternative(html_content, "text/html")
        msg.send(fail_silently=False)
        return True
    except Exception as e:
        print('There was an error sending an email: ', e) 
        # error = {'message': ",".join(e.args) if len(e.args) > 0 else 'Unknown Error'}
        return False
        # raise serializers.ValidationError(error)


