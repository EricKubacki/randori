(function() {


    $.fn.makeOriginalTable = function() {
        
        //reset div containting table to be empty
        $('#display').html('');

        //create table initial table and row
        $('#display').append('<table><tr></tr></table>');

        //put Day/City header in first table row
        setupDayCityColumnHeader();


        //extract dates from html and put into array
        var dates = getDates($('#lists div:first'));

        //add new row for each date, the first column having the date in it
        setupTableRows(dates);

        //get reference to each div that contains city info in it
        var listDivs = $('#lists div');

        //loop through each city div
        listDivs.each(function() {

            //add the city name as a column header
            var columnHead = $(this).find('h2').text();
            $('#display table tr:first').append('<th>' + columnHead + '</th>');

            //get temps for this city
            var temps = getCityTemps(this);

            //add temps to each row for the city
            $('#display table tr').each(function(index) {
                if (index > 0) {
                    var tableCell = $('<td>' + temps[index - 1] + '</td>');
                    $(this).append(tableCell);
                }
            });
        });

        //add a click event
        $('#display table th').click(function () {
            alert('Is a city where...');
        });


        function setupTableRows(dates) {
                for (var i = 0; i < dates.length; i++) {
                    $('#display table').append($('<tr><th style="color:red;">' + dates[i] + '</th></tr>'));
                }
        };

        function setupDayCityColumnHeader() {
            //set first column header with special header and font colors
            $('#display table tr')
                .append($('<th><span>Day</span> / <span>City</span></th>'))
                .css({'background-color': 'transparent'})
                .find('span:first').css('color', 'red');
        };
        
        function isEven(num) {
            var numHalfed = num / 2;
            return numHalfed === parseInt(numHalfed, 10);
        }
        
        function getCityTemps(divEl) {
            var listItems = $(divEl).find('li');
            var count = 0;
            var temps = [];
            listItems.each(function() {
                if (!isEven(count)) {
                    temps.push($(this).text());
                }
                count++;
            });
            return temps;
        }
        

        function getDates(divEl) { 
            var listItems = $(divEl).find('li');
            var count = 0;
            var dates = [];
            listItems.each(function() {
                if (isEven(count)) {
                    dates.push($(this).text());
                }
                count++;
            });
            return dates;
        }
    };
})();