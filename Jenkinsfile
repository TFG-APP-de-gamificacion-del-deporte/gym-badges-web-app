pipeline {
    environment {
        REPORT_FOLDER = '.reports'
        REGISTRY_CREDENTIAL = 'DockerHubDiego'
        IMAGE_NAME = "diegorevenga/gym-badges-web-app"
    }

    agent any
    stages {
        stage('Build') {
            agent any
            steps {
                script {
                    sh '''
                        ls -la
                        pwd
                    '''
                    docker.withRegistry('https://index.docker.io/v1/', REGISTRY_CREDENTIAL) {
                        def dockerfile = 'docker/dockerfile'
                        def customImage
                        def shortCommitHash = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
                        
                        if (params.BRANCH == 'main') {
                            customImage = docker.build("${IMAGE_NAME}:latest", "-f ${dockerfile} .")
                            customImage.push("latest")
                        } else if (params.BRANCH == 'develop') {
                            customImage = docker.build("${IMAGE_NAME}:DEVELOP", "-f ${dockerfile} .")
                            customImage.push("DEVELOP")
                        } else {
                            customImage = docker.build("${IMAGE_NAME}:${shortCommitHash}.FEATURE", "-f ${dockerfile} .")
                            customImage.push("${shortCommitHash}.FEATURE")
                        }
                    }
                }
            }
            post {
                cleanup {
                    cleanWs()
                }
            }
        }
        stage('Deliver') {
            steps {
                echo 'Pushing Docker Image to DockerHub'
                sh '''
                echo "doing delivery stuff.."
                '''
            }
        }
    }
}