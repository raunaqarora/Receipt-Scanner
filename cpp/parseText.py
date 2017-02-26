import numpy as np2
import cv2


def detectLetters(img):
    count = 0;
    img_gray = 0, img_sobel = 0, img_threshold = 0, element = 0;

    cv2.cvtColor(img,img_gray, cv2.COLOR_BGR2GRAY);
    cv2.Sobel(img_gray, img_sobel, cv2.CV_8U, 1, 0, 3, 1, 0, cv2.BORDER_DEFAULT);
    cv2.threshold(img_sobel, img_threshold, 0, 255, cv2.THRESH_OTSU+cv2.THRESH_BINARY);
    element = cv2.getStructuringElement(cv2.MORPH_RECT, (35, 5));
    cv2.morphologyEx(img_threshold, img_threshold, element, cv2.MORPH_CLOSE);
    contours = cv2.findContours(img_threshold, 0, 1);
    for i in contours.size():
        if contours[i].size()>100:
            cv2.approxPolyDP( cv2.Mat(contours[i]), contours_poly[i], 3, true );
            cv2.appRect( cv2.boundingRect( cv2.Mat(contours_poly[i]) ));

            n = 15;
            appRect.x-=n/2;
            appRect.y-=n/2;
            appRect.width+=n;
            appRect.height+=n;

            if appRect.width>appRect.height:
                boundRect.push_back(appRect);

    path = "slice";
    path+= count;
    path+=".jpg";
    cv2.imwrite(path,cv2.Mat(img,appRect));
    count+=1;
    return boundRect;

img1=cv2.imread("../test/test.jpg");
letterBBoxes1=detectLetters(img1);
i=0;
while i< letterBBoxes1.size():
    cv2.rectangle(img1,letterBBoxes1[i],cv2.Scalar(0,255,0),3,8,0);
    cv2.imwrite( "imgOut1.jpg", img1);
    i+=1;

