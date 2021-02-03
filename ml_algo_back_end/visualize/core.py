import matplotlib.pyplot as plt
import pandas as pd
from matplotlib.backends.backend_template import FigureCanvas
from matplotlib.figure import Figure


def plot(file_path: str):
    df = pd.read_csv(file_path, header="infer")
    # ax = plt.gca()
    fig = Figure()
    canvas = FigureCanvas(fig)
    ax = fig.add_subplot(111)
    df.plot(kind='line', x='1', y='predictions', ax=ax)
    return fig
