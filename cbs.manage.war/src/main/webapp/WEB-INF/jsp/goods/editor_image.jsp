<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="appName" value="${pageContext.request.contextPath}" />
<html>
<head>
	<title>插入照片</title>
	<link rel="shortcut icon" href="${appName}/public/images/favicon.ico" />
	<link rel="stylesheet" href="${appName}/public/css/lib/editor_image.css" />
</head>
<body>
	<div id="article_insert_body">
		<ul class="photo_menu">
			<li class="on"><a href="#take_upload">本地上传</a></li>
			<li><a href="#take_website">网络照片</a></li>
		</ul>
		<div class="article_insert_box fix" id="takephoto_content">
			<div id="take_upload">
				<a id="take_upload_insert" href="javascript:void(0);" class="gray_btn insert-button"> <span class="gray_btn_left"></span>
					<span class="gray_btn_mid">插入照片</span> <span class="gray_btn_right"></span>
				</a>
				<div class="photo_upload_opt_help"> 
					每次最多上传<span class="text_orange ml5 mr5">10</span>张，每张小于<span class="text_orange ml5 mr5">5</span>M
				</div>
				<s:if test="IE">
					<div id="content" class="photo_upload_box">
						<div class="photo_up_flash_fieldset" id="fsUploadProgress"></div>
						<div id="divStatus" class="photo_up_down_num"></div>
						<div id="divMovieContainer" class="photo_up_flash_btns tac">
							<span id="spanButtonPlaceHolder"></span> 
							<a href="javascript:void(0);" onclick="swfu.startUpload();" class="photo_up1" id="ediotrInsertPhoto" onmousedown="this.className='photo_up2'" onmouseup="this.className='photo_up1'"></a>
						</div>
					</div>
				</s:if>
				<div id="context_photo_upload"></div>
			</div>
			<div id="take_website" class="hidden">
				<a href="javascript:void(0);" id="take_website_insert" class="gray_btn insert-button">
					<span class="gray_btn_left"></span>
					<span class="gray_btn_mid">插入照片</span> <span class="gray_btn_right"></span>
				</a>
				<div class="upload_title">
					<div class="article_insert_care">
						<img class="img_align" src="http://static.l99.com/skin/lifeix/images/inf.gif" />请确定照片地址有效！
					</div>
				</div>
				<div class="photo_upload_box">
					<div class="photo_up_flash_fieldset">
						<table class="properties">
							<tr>
								<td class="column1"><label>照片地址:</label></td>
								<td>
									<input type="text" value="http://" id="netimg_src" onfocus="if(this.value=='http://')this.value=''" onblur="if(this.value=='')this.value='http://'" />
								</td>
							</tr>
						</table>
					</div>
					<div id="netimg" class="netimg-show"></div>
				</div>
			</div>
		</div>
		<input id="upload_app_album" value="${categoryId }" type="hidden" />
		<input id="allow_photo_water" value="true" type="hidden" />

		<script type="text/javascript" src="${appName}/public/js/lib/jquery-2.0.3.min.js"></script>
		<script type="text/javascript" src="${appName}/public/js/lib/upload/lifeix.syncupload.ie.src.js"></script>
		<script type="text/javascript" src="${appName}/public/js/lib/upload/lifeix.syncupload.src.js"></script>
		<script type="text/javascript" src="${appName}/public/js/lib/upload/editor_upload_new.src.js"></script>
		<script type="text/javascript">
			$("document").ready(function() {
				// 照片上传
				$("#context_photo_upload").initEditorUpload({
					"preix" : "${appName}/"
				});
			});
		</script>
</body>
</html>