pipeline {
    environment {
        backend = 'backend' // Specify your backend Docker image name/tag
        frontend = 'frontend' // Specify your frontend Docker image name/tag
        mongoImage = 'mongo:latest' // Specify the Mongo Docker image
        mongoContainerName = 'mongodb' // Specify the name for your mongo container
        MONGO_PORT = '27017'
        docker_image = ''
    }
    
    agent any

    stages {
        
        stage('Stage 0: Pull Mongo Docker Image') {
            steps {
                echo 'Pulling Mongo Docker image from DockerHub'
                script {
                    docker.withRegistry('', 'DockerHubCred') {
                        docker.image("${mongoImage}").pull()
                    }
                }
            }
        }
        
        stage('Stage 1: Git Clone') {
            steps {
                echo 'Cloning the Git repository'
                git branch: 'master', url: 'https://github.com/AK232003/SPE-Project.git'
            }
        }
        
        stage('Stage 3: Build backend Docker Image') {
            steps {
                echo 'Building backend Docker image'
                dir('backend')
                {
                    sh "docker build -t ak232003/${backend} ."
                }
            }
        }

        stage('Stage 4: Build frontend Docker image') {
            steps {
                echo 'Building frontend Docker image'
                dir('frontend') {
                    echo 'Changing to frontend directory'
                    sh "docker build -t ak232003/${frontend} ."
                }
            }
        }

        stage('Stage 5: Push backend Docker image to DockerHub') {
            steps {
                echo 'Pushing backend Docker image to DockerHub'
                script {
                    docker.withRegistry('', 'DockerHubCred') {
                        sh "docker push ak232003/${backend}"
                    }
                }
            }
        }
        
        stage('Stage 6: Push frontend Docker image to DockerHub') {
            steps {
                echo 'Pushing frontend Docker image to DockerHub'
                script {
                    docker.withRegistry('', 'DockerHubCred') {
                        sh "docker push ak232003/${frontend}"
                    }
                }
            }
}

        stage('Stage 7: Clean docker images') {
            steps {
                script {
                    sh 'docker container prune -f'
                    sh 'docker image prune -f'
                }
            }
        }

        stage('Stage 8: Ansible Deployment') {
            steps {
                ansiblePlaybook(
                    becomeUser: null,
                    colorized: true,
                    credentialsId: 'localhost',
                    disableHostKeyChecking: true,
                    installation: 'Ansible',
                    inventory: 'Deployment/inventory',
                    playbook: 'Deployment/deploy.yml',
                    sudoUser: null
                )
            }
        }
    }
}