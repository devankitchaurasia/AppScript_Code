function doGet(e){ 
  try{
   var param = e.parameter
   var editId = param.edit ? param.edit : '';      
   var status ;
  //   if(param.con && param.edit){
  //   status="Approving"
  //  }else 
   
   if(param.edit){
     status= "Editing"
   }else{
     status=""
   }

   var page = HtmlService.createTemplateFromFile('Page')
   page.status = status
   page.editId=editId
   page.user=Session.getActiveUser().getEmail();   
   return page.evaluate().setTitle('Rating Form').addMetaTag('viewport','width=device-width, initial-scale=1');
  }catch(error){
   var page = HtmlService.createTemplateFromFile('Page')
   return page.evaluate().setTitle('Rating Form').addMetaTag('viewport','width=device-width, initial-scale=1');
  }
}

function include(file){
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
  var timestamp = new Date();
  sheet.appendRow([formData.requestId, formData.rating,timestamp]);
  return ContentService.createTextOutput('Submission received. Thank you!');
}
