# ---- Base Node ----
  FROM node:18-alpine AS base
  WORKDIR /app
  # Install dependencies only needed for building native modules
  RUN apk add --no-cache build-base python3 
  
  # ---- Dependencies ----
  FROM base AS deps

  RUN apk add --no-cache libc6-compat
  # Copy package.json files
  COPY package.json package-lock.json* ./
  # Install dependencies
  RUN npm ci
  
  # ---- Builder ----
  FROM base AS builder
  WORKDIR /app
  # Copy dependencies
  COPY --from=deps /app/node_modules ./node_modules
  # Copy all project files
  COPY . .
  # Set environment variables
  ENV NEXT_TELEMETRY_DISABLED 1
  ENV NODE_ENV production
  # Build the application
  RUN npm run build
  
  # ---- Production ----
  FROM node:18-alpine AS runner
  WORKDIR /app
  
  # Set environment variables
  ENV NODE_ENV production
  ENV NEXT_TELEMETRY_DISABLED 1
  
  # Create non-root user for security
  RUN addgroup --system --gid 1001 nodejs
  RUN adduser --system --uid 1001 nextjs
  
  # Install Sharp dependencies
  RUN apk add --no-cache vips-dev fftw-dev build-base python3
  
  # Copy only the necessary files
  COPY --from=builder /app/next.config.js ./
  COPY --from=builder /app/public ./public
  COPY --from=builder /app/package.json ./package.json
  COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
  COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
  
  # Install only production dependencies
  RUN npm install --omit=dev sharp
  
  # Set permissions
  USER nextjs
  
  # Expose the port the app will run on
  EXPOSE 3000
  
  # Set the command to start the app
  CMD ["node", "server.js"]
  
  # Configure health check
  HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl -f http://localhost:3000/ || exit 1
