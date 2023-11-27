import requests
import time
import matplotlib.pyplot as plt


def query_function(numGenerations):
    url = "https://simulated-data-function.azurewebsites.net/api/task_1"

    code = "2XQkfIXOk94aIJ8c0VhB9wjASXLwimEFaVhK3s8i973LAzFunXTung=="

    params = {
        'code': code,
        'num_generations': numGenerations

    }

    # Make get request to azure function endpoint
    response = requests.get(url, params=params)

    return response


def run_tests(numGenerationsToTest):
    results = []

    # Time how long azure function query takes for each number of generations
    for numGenerations in numGenerationsToTest:
        start_time = time.time()

        response = query_function(numGenerations)

        if response.status_code != 200:
            return "Error: a request failed"

        elapsed_time = time.time() - start_time

        results.append(elapsed_time)

    return results


numGenerationsToTest = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000]
results = run_tests(numGenerationsToTest)

print(results)

plt.plot(numGenerationsToTest, results)
plt.xlabel("Number of sets of sensor data generated")
plt.ylabel("Runtime (s)")
plt.title("Simulated data function scalability")
plt.show()

