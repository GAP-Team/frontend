# --- Base for dependency install ---
    FROM node:20-alpine AS deps
    WORKDIR /app
    
    # Install all deps incl. devDependencies
    COPY package*.json ./
    RUN npm ci
    
    # --- Build Stage ---
    FROM deps AS builder
    WORKDIR /app
    COPY . .
    
    # Ensure tsconfig + aliases + env files available
    COPY .env .env
  
    RUN npm run build
    
    # --- Production Image (lean) ---
    FROM node:20-alpine AS runner
    WORKDIR /app
    
    # Copy only production deps
    COPY package*.json ./
    RUN npm ci --omit=dev
    
    # Copy build output and runtime code
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/next.config.js ./next.config.mjs
    COPY --from=builder /app/src ./src
    COPY --from=builder /app/tsconfig.json ./tsconfig.json
    
    EXPOSE 3000
    CMD ["npm", "start"]
    