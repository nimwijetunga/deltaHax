import cv2
import sys
import numpy as np
import math
from pdf2image import convert_from_path
from helpers import group, group2, list_to_set
def find_lines():
    pages = convert_from_path(sys.argv[1], 500)

    for ind, page in enumerate(pages):
        page.save('lineDetected%s.png' % ind)

    img = cv2.imread('lineDetected0.png')
    #gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)

    kernel_size = 1
    #blur_gray = cv2.GaussianBlur(gray,(kernel_size, kernel_size),0)

    low_threshold = 100
    high_threshold = 100
    #edges = cv2.Canny(blur_gray, low_threshold, high_threshold)
    edges = cv2.Canny(img, low_threshold, high_threshold)

    rho = 1  # distance resolution in pixels of the Hough grid
    theta = np.pi / 180  # angular resolution in radians of the Hough grid
    threshold = 700  # minimum number of votes (intersections in Hough grid cell)
    min_line_length = 350  # minimum number of pixels making up a line
    max_line_gap = 10   # maximum gap in pixels between connectable line segments
    line_image = np.copy(img) * 0  # creating a blank to draw lines on

    # Run Hough on edge detected image
    # Output "lines" is an array containing endpoints of detected line segments
    lines = cv2.HoughLinesP(edges, rho, theta, threshold, np.array([]),
                        min_line_length, max_line_gap)
    print(len(lines))
    lines = group2(lines.tolist())

    #grouped = group(lines.tolist())
    """lines_set = list_to_set(lines.tolist())
    group_set = list_to_set(grouped)
    lines_set = lines_set.difference(group_set)
    lines = list(lines_set)
    print(len(group_set))
    print(len(lines))
    print(group_set)
    print(lines_set)
    """

    #lines = cv2.HoughLines(edges,1,np.pi/180,200)
        # Draw the lines

    """if lines is not None:
        for i in range(0, len(lines)):
            rho = lines[i][0][0]
            theta = lines[i][0][1]
            a = math.cos(theta)
            b = math.sin(theta)
            x0 = a * rho
            y0 = b * rho
            pt1 = (int(x0 + 1000*(-b)), int(y0 + 1000*(a)))
            pt2 = (int(x0 - 1000*(-b)), int(y0 - 1000*(a)))
            cv2.line(line_image, pt1, pt2, (0,0,255), 3, cv2.LINE_AA)"""
    for line in lines:
        for x1,y1,x2,y2 in line:
           cv2.line(line_image,(x1,y1),(x2,y2),(255,0,0),5)


    lines_edges = cv2.addWeighted(img, 0.8, line_image, 1, 0)


    cv2.imwrite('new.png', line_image)
    lines = [line[0] for line in lines]
    print(lines)
    return lines

find_lines()
