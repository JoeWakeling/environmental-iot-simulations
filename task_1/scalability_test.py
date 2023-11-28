import aiohttp
import asyncio
import time
import matplotlib.pyplot as plt

URL = "https://simulated-data-function.azurewebsites.net/api/task_1"
URLLOCAL = "http://localhost:7071/api/task_1"
PARAMS = {"code": "2XQkfIXOk94aIJ8c0VhB9wjASXLwimEFaVhK3s8i973LAzFunXTung=="}


async def fetch(session):
    async with session.get(URL, params=PARAMS, ssl=False) as response:
        return await response.text()


async def run_test(num_generations):
    async with aiohttp.ClientSession() as session:
        tasks = [fetch(session) for _ in range(num_generations)]
        responses = await asyncio.gather(*tasks)
    return responses


# Test how long it takes to generate num_generations sets of sensor data
def run_tests(num_generations_to_test):
    results = []

    for num_generations in num_generations_to_test:
        start_time = time.time()

        # Run the test asynchronously
        loop = asyncio.get_event_loop()
        responses = loop.run_until_complete(run_test(num_generations))

        elapsed_time = time.time() - start_time
        results.append(elapsed_time)

    return results


# Plot graph of number of generations vs time taken
def plot_graph(numGenerationsToTest, results):
    plt.plot(numGenerationsToTest, results)
    plt.xlabel("Number of simultaneous sensor data generation requests")
    plt.ylabel("Time taken for all requests to complete (seconds)")
    plt.title("Scalability test")
    plt.show()

# Generate a list of numbers of generations to test from 5 to 1000 ascending in 5s
num_generations_to_test_ = []
for i in range(1, 200):
    num_generations_to_test_.append(i * 5)

# Run tests
results_ = run_tests(num_generations_to_test_)

# Show results
plot_graph(num_generations_to_test_, results_)
print(results_)



