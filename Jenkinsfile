pipeline {
    agent any

    options {
        timeout(time: 20, unit: 'MINUTES')
    }

    environment {
        NODE_VERSION = '18'
        PLAYWRIGHT_BROWSERS_PATH = "${WORKSPACE}/.cache/ms-playwright"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Setup Node') {
            steps {
                script {
                    // Assumes NodeJS plugin is configured with name 'NodeJS-18'
                    nodejs(nodeJSInstallationName: 'NodeJS-18') {
                        sh 'node -v'
                        sh 'npm -v'
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS-18') {
                    sh 'npm ci'
                }
            }
        }

        stage('Cache Playwright Browsers') {
            steps {
                script {
                    sh '''
                        mkdir -p .cache/ms-playwright
                        echo "Using Playwright cache at $PLAYWRIGHT_BROWSERS_PATH"
                    '''
                }
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS-18') {
                    sh 'npx playwright install --with-deps'
                }
            }
        }

        stage('Run Tests') {
            steps {
                nodejs(nodeJSInstallationName: 'NodeJS-18') {
                    sh 'npx playwright test'
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
    }
}