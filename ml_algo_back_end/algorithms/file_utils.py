from ml_algo_back_end import settings


class FileUtils:
    @staticmethod
    def build_path(path, user):
        return f"{settings.UPLOADS_ROOT}/{user.username}/{path}"

    @staticmethod
    def build_predictions_path(path, user):
        return f"{settings.PREDICTIONS_ROOT}/{user.username}/{path}"
