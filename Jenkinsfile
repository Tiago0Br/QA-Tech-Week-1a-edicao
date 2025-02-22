pipeline {
    agent any

    stages {
        stage('Setup') {
            steps {
                echo 'Instalando as dependências'
                sh 'npm install'
            }
        }
        stage('E2E tests') {
            steps {
                echo 'Executando os testes end-to-end'
                sh 'npm test'
            }
        }
    }
}
