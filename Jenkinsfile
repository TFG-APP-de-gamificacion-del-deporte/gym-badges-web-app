pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo "Building Docker Image"
                sh '''
                echo "doing build stuff.."
                '''
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