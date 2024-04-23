# SkillSprint

SkillSprint is an educational platform developed to offer a wide range of courses to learners. It provides a user-friendly web/mobile interface for browsing, enrolling in, and accessing courses. Instructors can manage course content, and learners can track their progress and enroll in multiple courses simultaneously.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have met the following requirements:
* [Node.js](https://nodejs.org/) installed on your machine.
* [Docker](https://www.docker.com/) installed and running.
* [Kubernetes](https://kubernetes.io/) installed and configured.

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd SkillSprint
   ```
3. Install dependencies for the backend and frontend:
   ```sh
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

## Usage

1. Start the backend server:
   ```sh
   cd ../backend
   npm start
   ```
2. Start the frontend server:
   ```sh
   cd ../frontend
   npm start
   ```
3. Open your browser and navigate to `http://localhost:3000` to access the SkillSprint web interface.

## Deployment

To deploy SkillSprint on a production system, follow these steps:
1. Build Docker images for the backend and frontend:
   ```sh
   docker build -t skillsprint-backend ./backend
   docker build -t skillsprint-frontend ./frontend
   ```
2. Tag the Docker images:
   ```sh
   docker tag skillsprint-backend <your-dockerhub-username>/skillsprint-backend
   docker tag skillsprint-frontend <your-dockerhub-username>/skillsprint-frontend
   ```
3. Push the Docker images to Docker Hub:
   ```sh
   docker push <your-dockerhub-username>/skillsprint-backend
   docker push <your-dockerhub-username>/skillsprint-frontend
   ```
4. Deploy the Docker images to Kubernetes:
   ```sh
   kubectl apply -f kubernetes/deployment.yaml
   ```

## Contributers

