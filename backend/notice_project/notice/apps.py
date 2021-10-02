from django.apps import AppConfig


class NoticeConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'notice'

    def ready(self):
        from  jobs import updater
        # updater.start()

