from util.load_resource import load_resource


file_path = "./data/data.json"
# this is calling from the main file, hence the path.
# temp solution, we may have to consider using sqlite since window and
# unix have diff fs


data = load_resource(file_path)
