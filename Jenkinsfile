pipeline {
    agent any

    stages {
        stage('Cloner le code') {
            steps {
                // On clone le repo Github
                git branch: 'main', url: 'https://github.com/kenaubry/CalculatriceJenkins'

            }
        }

        stage('Construire et tester') {
            steps {
                    // Construire l'image
                    bat "docker build --no-cache -t calculatrice:${env.BUILD_ID} ."

                    // Lancer le container → il démarre http-server + exécute test_calculatrice.js
                    bat "docker run --rm calculatrice:${env.BUILD_ID}"
                }
        }
        

        stage('Déployer en production') {
             when{
                expression {currentBuild.result == null || currentBuild.result == 'SUCCESS'}
            }
            steps {
                script{
                    // Poser la question : Voulez-vous déployer ? Oui/Non
                    input(message: 'Voulez-vous déployer en production ?', ok: 'Oui')
                    echo "🚀 Déploiement en cours..."

                    // Supprimer un ancien container prod s’il existe
                    bat 'docker rm -f calculatrice-prod || true'
                    
                    // Lancer l’appli en prod (pas les tests, juste le serveur statique)
                    bat "docker run -d -p 8081:8080 --name calculatrice-prod calculatrice:${env.BUILD_ID} npx http-server -p 8080"
                }
                
            }
        }
    }
}
