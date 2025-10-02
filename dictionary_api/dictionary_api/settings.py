"""
Django settings for dictionary_api project.
"""

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = "django-insecure-870zvsj2k4onem1%kul=#y9xw(6me=n56)ijpx6p_6c25b)_$9"
DEBUG = True
ALLOWED_HOSTS = []

# --------------------
# Applications
# --------------------
INSTALLED_APPS = [
    # Django apps
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # Sites framework (needed for allauth)
    "django.contrib.sites",

    # Third-party
    "rest_framework",
    "rest_framework.authtoken",
    "dj_rest_auth",
    "dj_rest_auth.registration",
    "allauth",
    "allauth.account",
    "corsheaders",
    "allauth.socialaccount", 

    # Your app
    "words",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",  # 👈 CORS should be high
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "allauth.account.middleware.AccountMiddleware",
]

ROOT_URLCONF = "dictionary_api.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",  # 👈 required by allauth
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "dictionary_api.wsgi.application"

# --------------------
# Database
# --------------------
DATABASES = {
    "default": {
        "ENGINE": "mssql",
        "NAME": "PythonDictionary",
        "HOST": "localhost",
        "PORT": "1433",
        "OPTIONS": {
            "driver": "ODBC Driver 18 for SQL Server",
            "extra_params": "Trusted_Connection=yes;Encrypt=yes;TrustServerCertificate=yes;",
        },
    }
}

# --------------------
# Authentication & Signup
# --------------------

SITE_ID = 1  # required for allauth

# ✅ Allow both username and email login
ACCOUNT_LOGIN_METHODS = {"username", "email"}

# ✅ Define signup fields (new format expected by Allauth 65+)
ACCOUNT_SIGNUP_FIELDS = {
    "username": {"required": True},
    "email": {"required": True},
    "password1": {"required": True},
    "password2": {"required": True},
}

# ✅ Email config
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_EMAIL_VERIFICATION = "none"  # "mandatory" if you add email confirmations later


# Tell allauth to accept either username OR email
ACCOUNT_AUTHENTICATION_METHOD = "username_email"

# Require email
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_UNIQUE_EMAIL = True

# Still allow usernames
ACCOUNT_USERNAME_REQUIRED = True


# --------------------
# REST Framework
# --------------------
REST_USE_JWT = True
JWT_AUTH_COOKIE = "my-app-auth"

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ]
}

# --------------------
# Password Validation
# --------------------
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# --------------------
# Internationalization
# --------------------
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# --------------------
# Static Files
# --------------------
STATIC_URL = "static/"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# --------------------
# CORS (Angular + Django)
# --------------------
CORS_ALLOWED_ORIGINS = [
    "http://localhost:4200",   # Angular dev
    "http://127.0.0.1:4200",
]

# Or, for dev only, uncomment to allow all:
# CORS_ALLOW_ALL_ORIGINS = True

REST_AUTH_SERIALIZERS = {
    'LOGIN_SERIALIZER': 'dictionary_api.authentication.serializers.CustomLoginSerializer',
}

