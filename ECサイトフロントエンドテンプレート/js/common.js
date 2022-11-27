$(function () {
    $(".menu-toggle_btn").on('click', function () {
        $(this).toggleClass('active');
        $('.menu-inner').toggleClass('active');
        $('menu__item').toggleClass('active');
    });

    $('.search').on('click', function () {
        var categoryId = $('#categoryId').val();
        var itemName = $('#itemName').val();

        $.ajax({
            url: '/searchitem',
            dataType: "text",
            type: "GET",
            data: {
                categoryId: categoryId,
                itemName: itemName
            },
            // Ajaxが正常終了した場合
        }).done(function (data, textStatus, jqXHR) {
            // 該当するデータが無かった場合
            if (!data) {
                alert("該当するデータはありませんでした");
                return;
            }

            // 該当するデータがあった場合は、取得したUserDataオブジェクトのリストを
            // 画面のtableタグに表示
            // その際、名前・性別・メモはデコードする
            const itemList = JSON.parse(data);
            var ins;
            for (i = 0; i < itemList.length; i++) {
                ins += '<li>';
                ins += '<a href="/detail?itemId=' + itemList[i].itemId + '">';
                ins += '<img src="./images/stationary_img/eraser.png" alt="">';
                ins += '<p>';
                int += itemList[i].itemName;
                ins += '</p>';
                ins += '</a>';
                ins += '</li>';
            }
            $("#products").html(ins);
            // Ajaxが異常終了した場合
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert("エラーが発生し、データが取得できませんでした");
        });
    });

});