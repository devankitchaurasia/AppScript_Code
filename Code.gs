function doGet(e) {
  try {
    var param = e.parameter
    var editId = param.edit ? param.edit : '';
    var status;
    //   if(param.con && param.edit){
    //   status="Approving"
    //  }else 

    if (param.edit) {
      status = "Editing"
    } else {
      status = ""
    }

    var page = HtmlService.createTemplateFromFile('Page')
    page.status = status
    page.editId = editId
    page.user = Session.getActiveUser().getEmail();
    return page.evaluate().setTitle('Rating Form').addMetaTag('viewport', 'width=device-width, initial-scale=1');
  } catch (error) {
    var page = HtmlService.createTemplateFromFile('Page')
    return page.evaluate().setTitle('Rating Form').addMetaTag('viewport', 'width=device-width, initial-scale=1');
  }
}

function include(file) {
  return HtmlService.createHtmlOutputFromFile(file).getContent();
}

function getFormEntriesContent(editId) {
  var foundData = {
    id: editId
  }
  return JSON.stringify(foundData);
}

function doPost(formData) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Rating');
  var dataRange = sheet.getDataRange();
  // var values = dataRange.getValues();

  var values = sheet.getRange("A2:A").getValues();  

  Logger.log("value"+values)  
  
  // Check if requestId already exists
  var requestIdColumn = 1; // Assuming requestId is in the first column
  var requestId = formData.requestId;
  
  var duplicateExists = false;
  for (var i = 0; i < values.length; i++) {
    if (values[i][requestIdColumn - 1] === requestId) {
      duplicateExists = true;
      break;
    }
  }

  // Check if duplicate requestId exists and return error message
  if (duplicateExists) {
    return {
      success: false,
      message: 'You have already submmited the rating.'
    };
  }

  // Append the row only if requestId does not exist
  var timestamp = new Date();
  sheet.appendRow([requestId, formData.rating, timestamp]);
  return {
    success: true,
    message: 'Submission received. Thank you!'
  };
}



