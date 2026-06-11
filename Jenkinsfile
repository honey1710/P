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
                    nodejs(nodeJSInstallationName: 'NodeJS-18') {
                        if (isUnix()) {
                            sh 'node -v'
                            sh 'npm -v'
                        } else {
                            bat 'node -v'
                            bat 'npm -v'
                        }
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    nodejs(nodeJSInstallationName: 'NodeJS-18') {
                        if (isUnix()) {
                            sh 'npm ci'
                        } else {
                            bat 'npm ci'
                        }
                    }
                }
            }
        }

        stage('Cache Playwright Browsers') {
            steps {
                script {
                    if (isUnix()) {
                        sh '''
                            mkdir -p .cache/ms-playwright
                            echo "Using Playwright cache at $PLAYWRIGHT_BROWSERS_PATH"
                        '''
                    } else {
                        bat '''
                            if not exist .cache\\ms-playwright mkdir .cache\\ms-playwright
                            echo Using Playwright cache at %PLAYWRIGHT_BROWSERS_PATH%
                        '''
                    }
                }
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                script {
                    nodejs(nodeJSInstallationName: 'NodeJS-18') {
                        if (isUnix()) {
                            sh 'npx playwright install --with-deps'
                        } else {
                            bat 'npx playwright install'
                        }
                    }
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    nodejs(nodeJSInstallationName: 'NodeJS-18') {
                        if (isUnix()) {
                            sh 'npx playwright test'
                        } else {
                            bat 'npx playwright test'
                        }
                    }
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