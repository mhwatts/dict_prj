# Copilot Instructions for AI Coding Agents

## Project Overview
This repository is a bilingual dictionary app with a Django REST API backend (`dictionary_api/`) and an Angular frontend (`dictionary-web/`).

### Architecture
- **Backend (`dictionary_api/`)**: Django project with a `words` app. Exposes RESTful endpoints for word management. SQLite is used for storage (`db.sqlite3`).
- **Frontend (`dictionary-web/`)**: Angular app styled with Tailwind CSS. Communicates with the backend via HTTP services.
- **Data Flow**: Angular frontend calls Django API endpoints (see `words/urls.py` and `dictionary_api/urls.py`).

## Developer Workflows
### Backend
- Run server: `python manage.py runserver` (from `dictionary_api/`)
- Run tests: `python manage.py test` (from `dictionary_api/`)
- Migrations: `python manage.py makemigrations words` and `python manage.py migrate`

### Frontend
- Install deps: `npm install` (from `dictionary-web/`)
- Run dev server: `npm start` or `ng serve` (from `dictionary-web/`)
- Build: `ng build`

## Project-Specific Patterns
- **API URLs**: All API endpoints are under `/api/words/` (see `words/urls.py`).
- **Serializers**: Use `words/serializers.py` for API data validation and transformation.
- **Angular Services**: API calls are abstracted in `dictionary.service.ts` and `word.service.ts`.
- **Component Structure**: Angular uses feature folders (e.g., `components/words/`, `components/dictionary/`).
- **Authentication**: Managed via `auth.service.ts` and `auth.interceptor.ts` (token-based, likely JWT).
- **Styling**: Tailwind CSS is configured via `tailwind.config.js` and used in both global and component styles.
- **Static Assets**: Place images in `dictionary-web/public/` or `dictionary-web/src/assets/`.

## Integration & Conventions
- **Backend**: Follows Django REST conventions. Use serializers for all API data. Add new endpoints in `words/views.py` and register in `words/urls.py`.
- **Frontend**: Use Angular services for all HTTP requests. UI logic is separated into feature components.

## Key Files & Directories
- `dictionary_api/words/models.py`: Word entry data model
- `dictionary_api/words/serializers.py`: API data validation
- `dictionary_api/words/views.py`: API logic
- `dictionary_api/words/urls.py`: API routing
- `dictionary-web/src/app/components/`: Angular feature components
- `dictionary-web/src/app/core/services/`: Shared Angular services

## Examples
- To add a new word API endpoint: update `views.py`, add to `urls.py`, and create/modify serializer as needed.
- To add a new Angular feature: create a folder in `components/`, add a service if needed, and update routing in `app.routes.ts`.

---
For questions about project structure or workflows, see this file or the referenced key files. Keep instructions concise and project-specific.
