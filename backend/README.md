# Backend Service

Local service ports and configurations.

## 🔌 Ports
- Backend API: `:4000`
- Redis: `:6379`
- Redis UI: `:5001`
- Swagger Docs: `/api-docs`

## ⚙️ Environment
```env
PORT=4000
NODE_ENV=development
OPENAI_API_KEY=your-api-key-here
REDIS_URL=redis://redis:6379
```

## 📝 Redis UI Access
Connect via Rebrow (http://localhost:5001):
- Host: `redis`
- Port: `6379`
- DB: `0` 