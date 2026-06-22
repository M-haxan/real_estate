# Node.js ka image use karein
FROM node:20-alpine

# Working directory set karein
WORKDIR /app

# Pehle root ka package.json copy karein aur dependencies install karein
COPY package*.json ./
RUN npm install

# Ab sirf 'api' folder ko copy karein (kyunke backend wahan hai)
COPY api/ ./api/

# Hugging Face ka port expose karein
EXPOSE 7860

# Backend ko start karne ka command
CMD ["node", "api/index.js"]