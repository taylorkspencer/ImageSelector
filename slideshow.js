var title = document.getElementById('titleText');
var selector = document.getElementById('selector');
var page = document.getElementById('imageWrapper');
var imageContainer = document.getElementById('image');
var imageDescription = document.getElementById('description');
var timerInterval = document.getElementById('interval');
var imagePanelHolder = document.getElementById('imagePanels');
var intervalId;
var selectedImage = '';
var infoBar = document.getElementById('infoBar');
var closeBtn = document.getElementById('closeBtn');
var interval;
title.innerHTML = document.title;
var imagesDir = 'images/';
var images = ['green.jpg', 'mrbrooks.jpg', 'mrbrooksarea.jpg', 'mrbrooksave.jpg', 'yaymrbrooks.jpg', 'yieldtomrbrooks.jpg']; // When changing the images in the slideshow, edit this
var selectedOption;
createImagePanels();
resize();
warnIE();

function setImage(image)
{
	if (selectedImage!=image)
	{
		if (selectedImage!='')
		{
			document.getElementById(selectedImage).className='unselected';
		}
		selectedImage = image;
	}
	else
	{
		this.location.href = imagesDir+image;
	}
	imageContainer.innerHTML = '<img src=\"'+imagesDir+selectedImage+'\" alt=\"'+selectedImage+' (Click to download image)\" class=\"img\" onClick=\"javascript:loadImage()\;\">';
	imageDescription.innerHTML = selectedImage;
	imageContainer.title = selectedImage+' (Click to download image)';
	imageDescription.title = selectedImage+' (Click to download image)';
	document.getElementById(selectedImage).className='selected';
	document.title = selectedImage+' - '+title.innerHTML;
}
function loadImage()
{
	setImage(selectedImage);
}
function firstImage()
{
	setImage(images[0]);
}
function previousImage()
{
	if ((getIndexOf(images, selectedImage))!=(0))
	{
		setImage(images[getIndexOf(images, selectedImage)-1]);
	}
	else
	{
		lastImage();
	}
}
function nextImage()
{
	if ((getIndexOf(images, selectedImage))!=(images.length-1))
	{
		setImage(images[getIndexOf(images, selectedImage)+1]);
	}
	else
	{
		firstImage();
	}
}
function lastImage()
{
	setImage(images[images.length-1]);
}
function setSlideshowInterval()
{
	/* I have to get it this way in IE because IE won't return an */
	/* accurate timerInterval.value for preselected elements */
	if (navigator.appName == "Microsoft Internet Explorer")
	{
		selectedOption = timerInterval.options(timerInterval.selectedIndex);
		if (((String)(selectedOption.innerText))==("0 (Slideshow Disabled)"))
		{
			window.clearInterval(intervalId);
		}
		else
		{
			interval = (((Number)(selectedOption.innerText))*100);
			intervalId = window.setInterval("nextImage()", interval);
		}
	}
	else
	{
		if (((String)(timerInterval.value))==("0 (Slideshow Disabled)"))
		{
			window.clearInterval(intervalId);
			intervalId = "";
		}
		else
		{
			interval = (((Number)(timerInterval.value))*100);
			intervalId = window.setInterval("nextImage()", interval);
		}
	}
}
function startSlideshow()
{
	firstImage();
	setSlideshowInterval();
}
function createImagePanels()
{
	var imagePanels = '';
	var processing = 0;
	while ((images.length-1)>=(processing))
	{
		imagePanels+=('<span onClick=\"javascript:setImage(\''+images[processing]+'\')\;\" title=\"'+images[processing]+'\" id=\"'+images[processing]+'\" class=unselected><img src=\"'+imagesDir+images[processing]+'\" class=thumbnail>'+images[processing]+'</span>');
		processing+=1;
	}
	imagePanelHolder.innerHTML = imagePanels;
}
function getIndexOf(array, object)
{
	var processing = 0;
	var objectFound = false;
	while ((!objectFound)&&((images.length-1)>=(processing)))
	{
		if (images[processing]==(object))
		{
			objectFound = true;
		}
		else
		{
			processing+=1;
		}
	}
	if (objectFound)
	{
		return processing;
	}
	else
	{
		return -1;
	}
}
function warnIE()
{
	if (navigator.appName == "Microsoft Internet Explorer")
	{
		showInfoBar();
	}
	else
	{
		closeInfoBar();
	}
}
function showInfoBar()
{
	infoBar.style.display = "block";
}
function closeInfoBar()
{
	infoBar.style.display = "none";
}
function resize()
{
	if (navigator.appName == "Microsoft Internet Explorer")
	{
		imagePanelHolder.style.width = ((document.body.clientWidth-112)+"px");
	}
	else
	{
		imagePanelHolder.style.width = ((window.innerWidth-104)+"px");
	}
}