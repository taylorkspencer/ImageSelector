var title = document.getElementById('titleText');
var titleBlock = document.getElementById('title');
var folderBar = document.getElementById('folderBar');
var directory = document.getElementById('directory');
var infoBar = document.getElementById('infoBar');
var closeBtn = document.getElementById('closeBtn');
title.innerHTML = document.title;
var imagesDir = 'images/';
var images = ['green.jpg', 'mrbrooks.jpg', 'mrbrooksarea.jpg', 'mrbrooksave.jpg', 'yaymrbrooks.jpg', 'yieldtomrbrooks.jpg']; // When changing the images in the slideshow, edit this
createDirectoryView();
warnIE();

function createDirectoryView()
{
	var imagePanels = '';
	var processing = 0;
	imagePanels+=('<div class=row>');
	while ((images.length-1)>=(processing))
	{
		imagePanels+=('<a href=\"'+imagesDir+images[processing]+'\" title=\"'+images[processing]+'\" id=\"'+images[processing]+'\" target=\"image\"class=file><img src=\"'+imagesDir+images[processing]+'\" class=thumbnail><span class=fileTitle>'+images[processing]+'</span></a>');
		if (processing==5)
		{
			imagePanels+=('</div><div class=row>');
		}
		processing+=1;
	}
	imagePanels+=('</div>');
	directory.innerHTML = imagePanels;
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
		directory.style.height = ((document.body.clientHeight-titleBlock.clientHeight-folderBar.clientHeight)+"px");
	}
	else
	{
		directory.style.height = ((window.innerHeight-titleBlock.clientHeight-folderBar.clientHeight)+"px");
	}
}