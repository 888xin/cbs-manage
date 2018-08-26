//package com.cbs.manage.controller.community;
//
//import java.io.File;
//import java.io.FileOutputStream;
//import java.io.IOException;
//import java.io.InputStream;
//import java.net.URL;
//import java.net.URLConnection;
//
//import org.apache.http.HttpStatus;
//import org.json.JSONException;
//
//import com.cbs.common.qiniu.QiniuFileUtil;
//import com.qiniu.api.auth.AuthException;
//import com.qiniu.api.auth.digest.Mac;
//import com.qiniu.api.io.IoApi;
//import com.qiniu.api.io.PutExtra;
//import com.qiniu.api.io.PutRet;
//import com.qiniu.api.rs.PutPolicy;
//
///**
// * @author zengguangwei
// *
// */
//public class VideoUtil {
//
//    /**
//     * 替换Token里的文件名称
//     *
//     * @param mimeType
//     * @param key
//     * @return
//     */
//    public static String replaceVideoFileName(int mimeType, String key) {
//        String temp = null;
//        // if (mimeType == TiyuFileType.JPG || mimeType == TiyuFileType.PNG || mimeType ==
//        // TiyuFileType.GIF) {
//        // temp = String.format("%s%s", TiyuFileType.IMG_PRE, key.split("\\.")[0]);
//        // } else if (mimeType == TiyuFileType.AMR) {
//        // temp = String.format("%s%s.amr", TiyuFileType.AUDIO_PRE, key.split("\\.")[0]);
//        // } else
//        if (mimeType == TiyuFileType.MP4) {
//            temp = String.format("%s%s.mp4", TiyuFileType.VIDEO_PRE, key.split("\\.")[0]);
//        } else if (mimeType == TiyuFileType.FLV) {
//            temp = String.format("%s%s.flv", TiyuFileType.VIDEO_PRE, key.split("\\.")[0]);
//        } else if (mimeType == TiyuFileType.AVI) {
//            temp = String.format("%s%s.avi", TiyuFileType.VIDEO_PRE, key.split("\\.")[0]);
//        }else{
//            return key;
//        }
//        return temp;
//    }
//
//    /**
//     * 获得视频时长
//     *
//     * @param urlPath
//     * @param file
//     * @return
//     * @throws IOException
//     */
////    public static int getDuration(String urlPath) throws IOException {
////        File file = null;
////        try {
////            file = new File("temp");
////            URL url = new URL(urlPath);
////            URLConnection connection = url.openConnection();
////            InputStream in = connection.getInputStream();
////            FileOutputStream fos = new FileOutputStream(file);
////            byte[] buf = new byte[512];
////            while (true) {
////                int len = in.read(buf);
////                if (len == -1) {
////                    break;
////                }
////                fos.write(buf, 0, len);
////            }
////            in.close();
////            fos.flush();
////            fos.close();
////
////            Encoder encoder = new Encoder();
////            MultimediaInfo m = encoder.getInfo(file);
////            long ls = m.getDuration();
////            int sec = (int) (ls / 1000);
////            return sec < 0 ? 1 : sec;
////        } catch (EncoderException e) {
////            e.printStackTrace();
////        } finally {
////            if (file != null) {
////                file.deleteOnExit();
////            }
////        }
////        return 0;
////    }
//
//    public static String uploadFile(String token, String prefix, String fileKey, InputStream inputStream)
//            throws AuthException {
//        try {
//            PutExtra extra = new PutExtra();
//
//            PutRet ret = IoApi.Put(token, prefix + fileKey, inputStream, extra);
//            if (ret.getStatusCode() == HttpStatus.SC_OK) {
//                return ret.getResponse();
//            }
//            throw new AuthException(ret.getStatusCode() + "");
//        } finally {
//            if (inputStream != null) {
//                try {
//                    inputStream.close();
//                } catch (IOException e) {
//                    e.printStackTrace();
//                }
//            }
//        }
//    }
//
//    public static final class TiyuFileType {
//
////        // 图片格式
////        public static final int JPG = 0;
////
////        // 图片格式
////        public static final int PNG = 1;
////
////        // 图片格式
////        public static final int GIF = 2;
////
////        // 音频格式
////        public static final int AMR = 3;
////
//        // 视频格式
//        public static final int MP4 = 6;
//
//        // 视频格式
//        public static final int FLV = 7;
//
//        // 视频格式
//        public static final int AVI = 8;
//
//        // 图片格式前缀
//        public static final String IMG_PRE = "community/img/";
//
//        // 音频格式前缀
//        public static final String AUDIO_PRE = "community/audio/";
//
//        // 视频格式前缀
//        public static final String VIDEO_PRE = "community/video/";
//
//    }
//
//    private static String ACCESS_KEY = "t9NZXPGfQqoapRzW-QVy5F0x5xkMAR9r0CPnfB2n";
//
//    private static String SECRET_KEY = "a5Dyw47BTbGOLyKPeRiTepEfo7ueMaR0qKQUF4B1";
//
//    private static String BUCKET_NAME = "lifeixroi";
//
//    public static String getVToken(String key, String fops) {
//        Mac mac = new Mac(ACCESS_KEY, SECRET_KEY);
//        PutPolicy p = new PutPolicy(BUCKET_NAME + ":" + key);
//        p.persistentOps = fops;
//        p.insertOnly = 1;
//        p.scope = BUCKET_NAME;
//        try {
//            String upToken = p.token(mac);
//            return upToken;
//        } catch (AuthException | JSONException e1) {
//            e1.printStackTrace();
//        }
//        return null;
//    }
//
//    public static void main(String[] args) throws JSONException {
//        String key = "co/im/xxx.mp4";
//        System.out.println(key);
//        String fops = "vframe/jpg/offset/2/w/250/h/200";
//        String token = getVToken(key, fops);
//        System.out.println(token);
//
//        // PutExtra extra = new PutExtra();
//        // PutRet ret = IoApi.putFile(token, key, "d://01.mp4", extra);
//        // System.out.println(ret);
//
//        String previewImageUrl = QiniuFileUtil.getInstance().getVideoFrame(token, key, fops);
//        System.out.println(previewImageUrl);
//    }
//}
