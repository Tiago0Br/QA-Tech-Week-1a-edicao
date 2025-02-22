pipeline {
    agent {
        docker {
            image 'papitodev/playwright-nj-v1.49.1-noble' 
            args '--network qatw-primeira-edicao_skynet'
        } 
    }

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
                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
            }
        }
    }
}
