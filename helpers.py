import numpy as np

def group(lines):
    thresh = 8
    grouped = []
    #print(lines)
    for ind1, line1 in enumerate(lines):
        for ind2, line2 in enumerate(lines[ind1+1:]):
            x11, y11, x21, y21 = line1[0]
            x12, y12, x22, y22 = line2[0]
            deltaX1 = x12 - x11
            deltaY1 = y12 - y11
            deltaX2 = x22 - x21
            deltaY2 = y22 - y21
            delta = (abs(deltaY1) + abs(deltaY2)) / 2 #deltaX1 * deltaX1 + deltaY1 * deltaY1 \
                    #+ deltaX2 * deltaX2 + deltaY2 * deltaY2
            if delta < thresh:
                print(deltaY1, deltaY2)
                del lines[ind1]

                grouped.extend(group(lines))
                return grouped
    
    grouped.extend(lines)
    return grouped

def group2(lines):
    thresh = 10
    new_lines = []
    lines = sorted(lines, key=lambda line : line[0][1])
    for ind, line in enumerate(lines):
        if ind == len(lines) - 2:
            break
        if abs(lines[ind + 1][0][1] - lines[ind][0][1]) >= thresh:
            new_lines.append(line)
    new_lines.append(lines[-1])
    return new_lines
            
def list_to_set(arr):
    _set = set()
    for element in arr:
        arr_tup = tuple(tuple(e) for e in element)
        _set.add(arr_tup)

    return _set
