var gulp = require("gulp");
var uglify = require("gulp-uglify");
var cmd = require("gulp-cmd");

gulp.task("watch", function() {
	gulp.watch("./js/page/*.js", ['cmd']);
});
/*---------common部分---------*/
gulp.task("common1", function() {
	return gulp.src("./js/page/common/common.js")
		.pipe(cmd())
		.pipe(uglify())
		.pipe(gulp.dest("./build/page/common/"));
});
/*---------aliases部分---------*/
gulp.task("aliases1", function() {
	return gulp.src("./js/page/aliases/aliases_list.js")
		.pipe(cmd())
		.pipe(uglify())
		.pipe(gulp.dest("./build/page/aliases/"));
});
/*---------event部分---------*/
gulp.task("event1", function() {
	return gulp.src("./js/page/event/event_bb.js")
		.pipe(cmd())
		.pipe(uglify())
		.pipe(gulp.dest("./build/page/event/"));
});
gulp.task("event2", function() {
	return gulp.src("./js/page/event/event_fb.js")
		.pipe(cmd())
		.pipe(uglify())
		.pipe(gulp.dest("./build/page/event/"));
});
gulp.task("event3", function() {
	return gulp.src("./js/page/event/event_odds_manage.js")
		.pipe(cmd())
		.pipe(uglify())
		.pipe(gulp.dest("./build/page/event/"));
});
gulp.task("event4", function() {
	return gulp.src("./js/page/event/event_restore.js")
		.pipe(cmd())
		.pipe(uglify())
		.pipe(gulp.dest("./build/page/event/"));
});
gulp.task("event5", function() {
	return gulp.src("./js/page/event/event_settle.js")
		.pipe(cmd())
		.pipe(uglify())
		.pipe(gulp.dest("./build/page/event/"));
});
gulp.task("event6", function() {
	return gulp.src("./js/page/event/event_team_edit.js")
		.pipe(cmd())
		.pipe(uglify())
		.pipe(gulp.dest("./build/page/event/"));
});
gulp.task("event7", function() {
    return gulp.src("./js/page/event/event_yy.js")
        .pipe(cmd())
        .pipe(uglify())
        .pipe(gulp.dest("./build/page/event/"));
});
gulp.task("event8", function() {
    return gulp.src("./js/page/event/event_player_edit.js")
        .pipe(cmd())
        .pipe(uglify())
        .pipe(gulp.dest("./build/page/event/"));
});
gulp.task("event9", function() {
    return gulp.src("./js/page/event/event_yy_bets.js")
        .pipe(cmd())
        .pipe(uglify())
        .pipe(gulp.dest("./build/page/event/"));
});
/*---------goods部分---------*/
gulp.task("goods1", function() {
	return gulp.src("./js/page/goods/goods_list.js")
		.pipe(cmd())
		.pipe(uglify())
		.pipe(gulp.dest("./build/page/goods/"));
});
gulp.task("goods2", function() {
	return gulp.src("./js/page/goods/goods_order.js")
		.pipe(cmd())
		.pipe(uglify())
		.pipe(gulp.dest("./build/page/goods/"));
});
/*---------login部分---------*/
gulp.task("login1", function() {
	return gulp.src("./js/page/login/login.js")
		.pipe(cmd())
		.pipe(uglify())
		.pipe(gulp.dest("./build/page/login/"));
});
/*---------im部分---------*/
gulp.task("im1", function() {
	return gulp.src("./js/page/im/banned_list.js")
		.pipe(cmd())
		.pipe(uglify())
		.pipe(gulp.dest("./build/page/im/"));
});
gulp.task("im2", function() {
	return gulp.src("./js/page/im/room_chat.js")
		.pipe(cmd())
		.pipe(uglify())
		.pipe(gulp.dest("./build/page/im/"));
});
gulp.task("im3", function() {
	return gulp.src("./js/page/im/room_list.js")
		.pipe(cmd())
		.pipe(uglify())
		.pipe(gulp.dest("./build/page/im/"));
});
/*---------imform部分---------*/
gulp.task("inform1", function() {
	return gulp.src("./js/page/inform/inform_manage.js")
		.pipe(cmd())
		.pipe(uglify())
		.pipe(gulp.dest("./build/page/inform/"));
});
/*---------role部分---------*/
gulp.task("role1", function() {
	return gulp.src("./js/page/role/authority_list.js")
		.pipe(cmd())
		.pipe(uglify())
		.pipe(gulp.dest("./build/page/role/"));
});
gulp.task("role2", function() {
	return gulp.src("./js/page/role/role_list.js")
		.pipe(cmd())
		.pipe(uglify())
		.pipe(gulp.dest("./build/page/role/"));
});
gulp.task("role3", function() {
	return gulp.src("./js/page/role/role_log_list.js")
		.pipe(cmd())
		.pipe(uglify())
		.pipe(gulp.dest("./build/page/role/"));
});
gulp.task("role4", function() {
	return gulp.src("./js/page/role/role_setting.js")
		.pipe(cmd())
		.pipe(uglify())
		.pipe(gulp.dest("./build/page/role/"));
});
/*---------rank部分---------*/
gulp.task("rank1", function() {
	return gulp.src("./js/page/rank/inner_rank_day.js")
		.pipe(cmd())
		.pipe(uglify())
		.pipe(gulp.dest("./build/page/rank/"));
});
gulp.task("rank2", function() {
	return gulp.src("./js/page/rank/inner_rank_week.js")
		.pipe(cmd())
		.pipe(uglify())
		.pipe(gulp.dest("./build/page/rank/"));
});
/*---------statistic部分---------*/
gulp.task("statistic1", function() {
	return gulp.src("./js/page/statistic/statistic_gold.js")
		.pipe(cmd())
		.pipe(uglify())
		.pipe(gulp.dest("./build/page/statistic/"));
});
gulp.task("statistic2", function() {
	return gulp.src("./js/page/statistic/statistic_gold_detail.js")
		.pipe(cmd())
		.pipe(uglify())
		.pipe(gulp.dest("./build/page/statistic/"));
});
gulp.task("statistic3", function() {
	return gulp.src("./js/page/statistic/statistic_money_detail.js")
		.pipe(cmd())
		.pipe(uglify())
		.pipe(gulp.dest("./build/page/statistic/"));
});
gulp.task("statistic4", function() {
    return gulp.src("./js/page/statistic/statistic_bet.js")
        .pipe(cmd())
        .pipe(uglify())
        .pipe(gulp.dest("./build/page/statistic/"));
});
/*---------user部分---------*/
gulp.task("user1", function() {
	return gulp.src("./js/page/user/cbs_users.js")
		.pipe(cmd())
		.pipe(uglify())
		.pipe(gulp.dest("./build/page/user/"));
});
gulp.task("user2", function() {
	return gulp.src("./js/page/user/inner_settle.js")
		.pipe(cmd())
		.pipe(uglify())
		.pipe(gulp.dest("./build/page/user/"));
});
gulp.task("user3", function() {
	return gulp.src("./js/page/user/inner_bet.js")
		.pipe(cmd())
		.pipe(uglify())
		.pipe(gulp.dest("./build/page/user/"));
});
gulp.task("user4", function() {
    return gulp.src("./js/page/user/user_star.js")
        .pipe(cmd())
        .pipe(uglify())
        .pipe(gulp.dest("./build/page/user/"));
});
/*---------content部分---------*/
gulp.task("content1", function() {
    return gulp.src("./js/page/content/placard_list.js")
        .pipe(cmd())
        .pipe(uglify())
        .pipe(gulp.dest("./build/page/content/"));
});
gulp.task("content2", function() {
    return gulp.src("./js/page/content/frontpage.js")
        .pipe(cmd())
        .pipe(uglify())
        .pipe(gulp.dest("./build/page/content/"));
});
gulp.task("content3", function() {
    return gulp.src("./js/page/content/friend_circle.js")
        .pipe(cmd())
        .pipe(uglify())
        .pipe(gulp.dest("./build/page/content/"));
});
gulp.task("content4", function() {
    return gulp.src("./js/page/content/circlecomment.js")
        .pipe(cmd())
        .pipe(uglify())
        .pipe(gulp.dest("./build/page/content/"));
});
/*---------coupons部分---------*/
gulp.task("coupons1", function() {
    return gulp.src("./js/page/coupons/coupons_list.js")
        .pipe(cmd())
        .pipe(uglify())
        .pipe(gulp.dest("./build/page/coupons/"));
});

gulp.task("default", ["common1","aliases1","event1","event2","event3","event4","event5","event6","event7","event8","event9","goods2","goods1",
    "im1","im2","im3","inform1","login1","role1","role2","role3","role4","rank1","rank2","statistic1","statistic2","statistic3","statistic4","user1",
    "user2","user3","user4","content1","content2","content3","content4","coupons1"]);

//压缩步骤
//1.进入cbs-manage\cbs.manage.war\src\main\webapp\public 运行npm install （说明：要有node环境）
//2.直接运行cbs-manage\cbs.manage.war\src\main\webapp\public\node_modules\.bin\gulp 进行全部压缩 后面跟名称就是压缩指定文件





