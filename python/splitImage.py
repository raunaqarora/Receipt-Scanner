import cv2
import sys

image = cv2.imread(sys.argv[1])
gray = cv2.cvtColor(image,cv2.COLOR_BGR2GRAY) # grayscale
_,thresh = cv2.threshold(gray,0,255,cv2.THRESH_BINARY_INV+cv2.THRESH_OTSU) # threshold
kernel = cv2.getStructuringElement(cv2.MORPH_RECT,(35,5))
thresh = cv2.morphologyEx(thresh,cv2.MORPH_CLOSE,kernel)
#dilated = cv2.dilate(thresh,kernel,iterations = 13) # dilate
_, contours, hierarchy = cv2.findContours(thresh,0,1) # get contours

# for each contour found, draw a rectangle around it on original image
for contour in contours:
    # get rectangle bounding contour
    [x,y,w,h] = cv2.boundingRect(contour)

    # discard areas that are too large
    if h>100:
        continue

    # discard areas that are too small
    if h<25 or w<25:
        continue
    # Write splice to disk
    cv2.imwrite("/tmp/splitImage/slice-"+str(y)+"-"+str(x)+"-.jpg",image[y-5:y+h+5,x-5:x+w+5])

    # draw rectangle around contour on original image
    cv2.rectangle(image,(x-5,y-5),(x+w+5,y+h+5),(255,0,255),2)

# write original image with added contours to disk
cv2.imwrite("contoured.jpg", image)