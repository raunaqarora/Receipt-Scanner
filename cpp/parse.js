'use strict';

const cv = require('opencv');

function detectLetters(imgPath){
  cv.readImage('../test/test.jpg', function(error,im){
    let count = 0;
    im.convertGrayscale();

  });
}

std::vector<cv::Rect> detectLetters(cv::Mat img)
{
  int count = 0;
  std::vector<cv::Rect> boundRect;
  cv::Mat img_gray, img_sobel, img_threshold, element;
  cvtColor(img, img_gray, CV_BGR2GRAY);
  cv::Sobel(img_gray, img_sobel, CV_8U, 1, 0, 3, 1, 0, cv::BORDER_DEFAULT);
  cv::threshold(img_sobel, img_threshold, 0, 255, CV_THRESH_OTSU+CV_THRESH_BINARY);
  element = getStructuringElement(cv::MORPH_RECT, cv::Size(35, 5) );
  cv::morphologyEx(img_threshold, img_threshold, CV_MOP_CLOSE, element); //Does the trick
  std::vector< std::vector< cv::Point> > contours;
  cv::findContours(img_threshold, contours, 0, 1);
  std::vector<std::vector<cv::Point> > contours_poly( contours.size() );
  for( int i = 0; i < contours.size(); i++ )
  if (contours[i].size()>100)
  {
    cv::approxPolyDP( cv::Mat(contours[i]), contours_poly[i], 3, true );
    cv::Rect appRect( boundingRect( cv::Mat(contours_poly[i]) ));

    //Enlarge box by n so text isn't cut off
    int n = 15;
    appRect.x-=n/2;
    appRect.y-=n/2;
    appRect.width+=n;
    appRect.height+=n;

    if (appRect.width>appRect.height){
      boundRect.push_back(appRect);
      std::string path = "slice";
      path+=std::to_string(count);
      path+=".jpg";
      cv::imwrite(path,cv::Mat(img,appRect));
      count++;
    }
  }
  return boundRect;
}

int main(int argc,char** argv)
{
  //Read
  cv::Mat img1=cv::imread("../test/test.jpg");
  //Detect
  std::vector<cv::Rect> letterBBoxes1=detectLetters(img1);
  //Display
  for(int i=0; i< letterBBoxes1.size(); i++)
  cv::rectangle(img1,letterBBoxes1[i],cv::Scalar(0,255,0),3,8,0);
  cv::imwrite( "imgOut1.jpg", img1);
  return 0;
}
