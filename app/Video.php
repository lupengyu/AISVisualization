<?php
/**
 * Created by PhpStorm.
 * User: zym
 * Date: 2015/7/1
 * Time: 18:25
 */

class Video {
    private $secretkey;   // 用户密钥
    private $user_unique;
    private $ver = "2.0";  // 默认值
    private $api_url = "http://api.letvcloud.com/open.php";
    private $format;

    public function __construct($secretkey, $user_unique, $format = 'json') {
        $this->secretkey = $secretkey;
        $this->user_unique = $user_unique;
        $this->format = $format;
    }

    public function init($video_name, $file_size, $client_ip, $uploadtype = 0, $uc1 = 0, $uc2 = 0) {
        $api = 'video.upload.init';

        $params['video_name'] = $video_name;
        $params['file_size'] = $file_size;
        $params['uploadtype'] = $uploadtype;
        $params['api'] = $api;
        $params['client_ip'] = $client_ip;
        $params['uc1'] = $uc1;
        $params['uc2'] = $uc2;

        $final_url = $this->_handleParam($params, $api);
        //print htmlspecialchars($final_url);
        return file_get_contents($final_url); //htmlspecialchars($final_url);

    }

    // 断点续传
    public function resume($token, $client_ip,$uploadtype = 0) {
        $api = 'video.upload.resume';

        $params['token'] = $token;
        $params['uploadtype'] = $uploadtype;
        $params['api'] = $api;
        $params['client_ip'] = $client_ip;

        $final_url = $this->_handleParam($params, $api);

        return file_get_contents($final_url);
    }

    /////////////////////////////////////////////////////

    private function _handleParam($params) {

        $params['user_unique'] = $this->user_unique;
        $params['timestamp'] = time();
        $params['format'] = $this->format;
        $params['ver'] = $this->ver;


        // 对所有参数按key排序
        ksort($params);
        $url_param = '';
        $keyStr = '';    // 用于生成验证码的字符串由参数的键值和用户密钥拼接而成

        foreach($params as $key=>$param) {
            $url_param .= (empty($url_param) ? '?' : '&') . $key . '=' . urlencode($param);
            $keyStr .= $key . $param;
        }

        $keyStr .= $this->secretkey;

        $sign = md5($keyStr);  // 计算sign参数
        $url_param .= '&sign=' . $sign;
        $final_url = $this->api_url . $url_param;

        return $final_url;
    }

}
