let getData = (function () {
	let lists = [
		"Combined Print and E-Book Fiction",
		"Combined Print and E-Book Nonfiction",
		"Hardcover Fiction",
		"Hardcover Nonfiction",
		"Trade Fiction Paperback",
		"Mass Market Paperback",
		"Paperback Nonfiction",
		"E-Book Fiction",
		"E-Book Nonfiction",
		"Hardcover Advice",
		"Paperback Advice",
		"Advice How-To and Miscellaneous",
		"Chapter Books",
		"Childrens Middle Grade",
		"Childrens Middle Grade E-Book",
		"Childrens Middle Grade Hardcover",
		"Childrens Middle Grade Paperback",
		"Paperback Books",
		"Picture Books",
		"Series Books",
		"Young Adult",
		"Young Adult E-Book",
		"Young Adult Hardcover",
		"Young Adult Paperback",
		"Hardcover Graphic Books",
		"Paperback Graphic Books",
		"Manga",
		"Combined Print Fiction",
		"Combined Print Nonfiction",
		"Animals",
		"Audio Fiction",
		"Audio Nonfiction",
		"Business Books",
		"Celebrities",
		"Crime and Punishment",
		"Culture",
		"Education",
		"Espionage",
		"Expeditions Disasters and Adventures",
		"Fashion Manners and Customs",
		"Food and Fitness",
		"Games and Activities",
		"Hardcover Business Books",
		"Health",
		"Humor",
		"Indigenous Americans",
		"Relationships",
		"Paperback Business Books",
		"Family",
		"Hardcover Political Books",
		"Race and Civil Rights",
		"Religion Spirituality and Faith",
		"Science",
		"Sports",
		"Travel"
	];
	// default options
	const nyt_endpoint = "https://api.nytimes.com/svc/books/v3/";
	// let nyt_listParams = 'lists/2019-01-01/hardcover-fiction.json?';
	const nyt_key = "api-key=jGJGGPp2j3xzgOmII98GpJxgukWxBnS3";
	let listOjb = {};
	lists.map(function (item) {
		listOjb[item] = null;
	});

	let init = function () {
		initAutoComplete();
	};

	function getBookListFromAPI(listDate, listName) {
		let date = listDate != "" ? listDate : "2019-01-01";
		let name = listName != "" ? listName : "hardcover-fiction";
		let url =
			nyt_endpoint + "lists/" + listDate + "/" + name + ".json?" + nyt_key;
		$.ajax({
			url: url
		}).then(function (res) {
			let listTitle = res.results.list_name;
			let books = res.results.books;
			console.log(books);
			if (books) {
				$('section .search-wrapper').addClass('list-selected');
				$('section.book-list').slideDown(300, function(){
					books.map(function (book) {
						// console.log(book.title);
						createCard(book);
					});
				});
			}
		});
	}

	
	
	function initAutoComplete() {
		let listOjb = {}
		lists.map(function (item) { listOjb[item] = null; });
		$("input.autocomplete").autocomplete({
			data: listOjb,
			onAutocomplete: initDatePicker
		});
	}

	function initDatePicker(val) {
		$('.datepicker-wrapper').slideDown(200, function(){
			// console.log(val);
			$(".datepicker").datepicker({
				setDefaultDate: true,
				autoClose: true,
				format: 'yyyy mm dd',
				onSelect: function(date){
					getBookListFromAPI(date,val);
				}
			});
		});
	}
	return {
		init: init,
		getBookList: getBookListFromAPI
	};
})();
getData.init();

const detailTemplate = `
<div class="card detail row hoverable">
  <div class="card-image col s12 m3 l2 size ">
    <img
      class="image"
      src=""
    />
  </div>
  <div class="card-stacked col s12 m9 l10 ">
    <div class="card-content book-info">
      <p class="title"></p>
      <p class="writer"></p>
    </div>
    <div class="card-action">
      <p class="description"></p>
    </div>
  </div>
</div>
`;

function createCard(book) {
	const detail = $(detailTemplate);
	detail.find(".title").text(book.title);
	detail.find(".writer").text(book.contributor);
	detail.find(".description").text(book.description);
	detail.find(".image").attr("src", book.book_image);
	$(".book-list-wrapper").append(detail);

	// // console.log(book);
	// detail.on('click', function () {
	// 	const publishDate = $("<p>").text(book.published_date);
	// 	detail.find(".book-info").append(publishDate);
	// 	// console.log("click")

	// });
}