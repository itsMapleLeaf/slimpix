public bookmark

- url: https://www.pixiv.net/touch/ajax_api/ajax_api.php
- method: POST
- content-type: application/x-www-form-urlencoded; charset=UTF-8
- body:
  - mode: add_bookmark_illust
  - restrict: 0
  - tag:
  - tt: f1278fffefa0e4fe2fb9da2fa89ba936
  - id: <illust_id>
  - comment:

private bookmark:

- url: https://www.pixiv.net/touch/ajax_api/ajax_api.php
- method: POST
- content-type: application/x-www-form-urlencoded; charset=UTF-8
  - mode: add_bookmark_illust
  - restrict: 1
  - tag:
  - tt: f1278fffefa0e4fe2fb9da2fa89ba936
  - id: <illust_id>
  - comment:

unbookmark:

- url: https://www.pixiv.net/touch/ajax_api/ajax_api.php
- method: POST
- content-type: application/x-www-form-urlencoded; charset=UTF-8
- body:
  - mode: delete_bookmark_illust
  - restrict: 0
  - tag:
  - tt: f1278fffefa0e4fe2fb9da2fa89ba936
  - id: <illust_id>
  - comment:
