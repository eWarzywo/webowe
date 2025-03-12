from typing import List, Tuple

def read_graph(filename: str) -> Tuple[List[List[int]], int]:
    with open(filename, 'r') as file:
        lines = file.readlines()
        num_vertices = int(lines[0].strip())
        adjacency_list = []
        for line in lines[1:]:
            adjacency_list.append(list(map(int, line.strip().split())))
    return adjacency_list, num_vertices

def write_neighbours_list(adjacency_list: List[List[int]]) -> None:
    for i, neighbours in enumerate(adjacency_list):
        print(f"Sąsiadami wierzchołka {i} są: {', '.join(map(str, neighbours))}")

def list_to_matrix(adjacency_list: List[List[int]], num_vertices: int) -> List[List[int]]:
    adjacency_matrix = [[0] * num_vertices for _ in range(num_vertices)]
    for i, neighbours in enumerate(adjacency_list):
        for neighbour in neighbours:
            adjacency_matrix[i][neighbour] = 1
    return adjacency_matrix

def write_matrix(adjacency_matrix: List[List[int]]) -> None:
    for row in adjacency_matrix:
        print(' '.join(map(str, row)))

def main() -> None:
    filename = 'graph.txt'
    adjacency_list, num_vertices = read_graph(filename)
    write_neighbours_list(adjacency_list)
    adjacency_matrix = list_to_matrix(adjacency_list, num_vertices)
    write_matrix(adjacency_matrix)

if __name__ == "__main__":
    main()