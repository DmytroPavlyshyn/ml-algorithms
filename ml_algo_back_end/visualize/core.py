import matplotlib.pyplot as plt
import pandas as pd
from matplotlib.backends.backend_template import FigureCanvas
from matplotlib.figure import Figure


def plot(actual_data_path: str, predicted_data_path: str):
    # actual_data_path = "/Users/dmytropavlyshyn/media/ml-algo/uploads/testCO (1).txt"
    # predicted_data_path = "/Users/dmytropavlyshyn/media/ml-algo/predictions/2021-04-04-19-26-49_b7977c88-da7b-44f9-82bc-5bd069024c0b.csv"
    actual_df = pd.read_csv(actual_data_path, header=None).iloc[:, -1:]
    predicted_df = pd.read_csv(predicted_data_path, header="infer").iloc[:, -1:]

    fig = plt.figure()

    import matplotlib.pyplot as pltx
    plt.scatter(actual_df, predicted_df, )
    plt.xlabel("actual")
    plt.ylabel("predicted")
    plt.legend()
    return fig
