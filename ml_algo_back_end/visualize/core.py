import matplotlib.pyplot as plt
import pandas as pd


def plot(actual_data_path: str, predicted_data_path: str):
    actual_df = pd.read_csv(actual_data_path, header=None).iloc[:, -1:]
    predicted_df = pd.read_csv(predicted_data_path, header="infer").iloc[:, -1:]
    fig = plt.figure()
    plt.scatter(actual_df, predicted_df, )
    plt.xlabel("actual")
    plt.ylabel("predicted")
    plt.legend()
    return fig
