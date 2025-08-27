FROM selenium/standalone-chrome:latest

USER root
RUN apt-get update && apt-get install -y curl gnupg \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Définir le repertoire de travail
WORKDIR /calculatrice-app
# Copier les fichiers vers le repertoire de travail
COPY . .
# Installer selenium-webdriver + http-server
RUN npm install selenium-webdriver http-server --save-dev
# Exposer le port 
EXPOSE 8080

# Démarrer le serveur statique + attendre + lancer les tests
#sh:shell(starts a shell (like a command prompt) -c:command
CMD ["cmd", "-c", "npx http-server -p 8080 & sleep 5 && node test_calculatrice.js"]
