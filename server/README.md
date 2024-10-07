# Setup Guide

## Step 1: Set up the server

1. **Open Command Prompt:**
   Open the command prompt on your machine.

2. **Navigate to the project directory:**
   Go to the server folder of your project:

   ```bash
   cd <your-project-path>/server

   ```

3. **Install Dependencies:**
   Run the following command to install the required dependencies:

   ```bash
   npm install --force
   ```

4. **Set up environment variables:**
   - Copy the content from the `.env.example` file
   - Create a new `.env` file in the same location and paste the copied content.
   - Update the `.env` file as per your configuration needs.
5. **Run the development server:**
   Start the server by running:

   ```bash
   npm run dev
   ```

6. **Check if the server is running:**
   Open your browser and visit the following URL:

   ```bash
   http://localhost:8080/ping
   ```

   If you get a pong response, your server is running correctly.

## Step 2: Set up Prometheus

1. **Configure Prometheus:**

   - Open the `prometheus-config.yml` file.
   - In the `targets` array, add the IP address of your local machine
     - If you're running this on a production server, replace it with the production server's IP address.

2. **Check Prometheus metrics:**
   You can verify that Prometheus is working by navigating to:

   ```bash
   http://localhost:8080/metrics
   ```

3. **Run Prometheus using Docker:**
   Run the following command to start Prometheus via Docker:

   ```bash
   docker compose up
   ```

## Step 3: Set up Grafana

1. **Run Grafana using Docker:** To set up Grafana, run this command:

   ```bash
   docker run -d -p 3000:3000 --name=grafana grafana/grafana-oss
   ```

2. **Log in to Grafana:**

   - Open your browser and navigate to:

   ```bash
   http://localhost:3000/login
   ```

   - Use the following credentials:
     - Username: `admin`
     - Password: `admin`

3. **Set up Grafana Prometheus data source:**

   - After logging in, skip the "update your password" step if desired.
   - Navigate to: `Connections` > `Data Sources` > `Prometheus`.
   - Enter the following:
     - Name:`Prometheus`
     - Prometheus server URL: `http://<ip-address-of-your-local-machine>:9090`
     - Scroll down and click `Save and Test`.
   - Ensure that you see a success message confirming the connection.

4. Import a Grafana Dashboard:
   - Go to: Dashboards > New > Import.
   - Enter the following code in the "Import via grafana.com" field:
     ```bash
     11159
     ```
    - Select Prometheus as the data source and click Import.

That’s it! You have now set up your server, Prometheus, and Grafana.