const axios = require('axios');
const hubspot = require('@hubspot/api-client')

const pdapikey = process.env.PANDADOC_API_KEY;

	const contract_template_uuid = "NcFJkYeT2KnyUt9HYRMmbm";

	let contract_doc_id; 

  /*****	SET UP FUNCTIONS	******/

  async function getUserInfo(deliveriesTicketId,hubspotClient){
    try{
      const associatedContacts = await hubspotClient.crm.tickets.associationsApi.getAll(deliveriesTicketId, 'contacts')  
      const associatedContactId = associatedContacts.results[0].toObjectId; 
      const response = await hubspotClient.crm.contacts.basicApi.getById(associatedContactId);     
      return response;
    }catch(error){
      console.error('Error fetching associated contact properties:', error);
      throw new Error(error)
    }
  }

  async function getDealsInfo(deliveriesTicketId,hubspotClient){
    try{
      const associatedDeals = await hubspotClient.crm.tickets.associationsApi.getAll(deliveriesTicketId, 'deals')  
      const associatedDealId = associatedDeals.results[0].toObjectId; 
      const response = await hubspotClient.crm.deals.basicApi.getById(associatedDealId); 
      
      console.log(response)
        
      return "response";
    }catch(error){
      console.error('Error fetching associated deals properties:', error);
      throw new Error(error)
      }
  }

  async function getCompanyInfo(deliveriesTicketId,hubspotClient){
    try{
      const associatedCompany = await hubspotClient.crm.tickets.associationsApi.getAll(deliveriesTicketId, 'companies')  
      const associatedCompanyId = associatedCompany.results[0].toObjectId; 
      const response = await hubspotClient.crm.companies.basicApi.getById(associatedCompanyId,['tax_id']);     
      return response;
    }catch(error){
      console.error('Error fetching associated deals properties:', error);
      throw new Error(error)
      }
  }


async function getAssociatedTicketProperties(ticketId,hubspotClient) {
    try {
      const response = await hubspotClient.crm.tickets.basicApi.getById(ticketId,[
        'erp_contract_company','erp_contract_number','erp_contract_type'
      ]);
	    const company = response?.properties?.erp_contract_company || ''
      const number = response?.properties?.erp_contract_number || ''
      const type = response?.properties?.erp_contract_type || ''
      
      const contract_id = `${company}${number}${type}`
      
      return contract_id;
    } catch (error) {
      	console.error('Error fetching associated ticket properties:', error);
      	throw new Error(error)
   }
 }

  async function createPdDocument(template_uuid, recipients,metadata) {
    const headers = {
      headers: {
        'Content-Type': 'application/json', 'Authorization': `API-Key ${pdapikey}`
      }
    }; 
    
    const url = 'https://api.pandadoc.com/public/v1/documents';
    
    const data = {
      name: "Contract Workflow",
      template_uuid: template_uuid,
      recipients: recipients,
      metadata: metadata,
      tags: ["contract_tag"] //add any tag for this documents (contract tag)
    };
    try{
    const response = await axios.post(url, data, headers);
    
    return response;
    }
    catch(error){
      console.error('Error creating pandadoc document:', error);
      throw new Error(error)
    }
  } 

exports.main = async (event, callback, error) => {  
  /*****
    Use inputs to get data from any action in your workflow and use it in your code instead of having to use the HubSpot API.
  *****/  
  
    //set up client
    const hubspotClient = new hubspot.Client({
      accessToken: process.env.ACCESS_TOKEN
    });
   
   //Ticket ID
   const hs_object_id = event?.object?.objectId
 
   //get contract id by ticket
   const contract_ticket_id = await getAssociatedTicketProperties(hs_object_id,hubspotClient)
   
   //get user information for this contract
   const user_info = await getUserInfo(hs_object_id,hubspotClient)
   const user_info_properties = {
    firstname: user_info?.firstname || '',
    lastname: user_info?.lastname || '',
    email: user_info?.email || '' 
   }
   
   //get tax id from company
   const company_info = await getCompanyInfo(hs_object_id,hubspotClient) 
   const tax_id = company_info?.properties?.tax_id
   
  const recipients = [{
      first_name: user_info_properties.firstname,
      last_name: user_info_properties.lastname,
      email: user_info_properties.email,
      role: "Signer",
      signing_order: 1
  }] //TODO create recipients
 
  // TODO create metadata and form fields
  const metadata = {
    contractId: contract_ticket_id,
    customerAFM: tax_id,
    tag: "contract_tag", //contract tag
  };
  
  // Create PandaDoc Document & Get Pandadoc Id
  const contract_resp = await createPdDocument(contract_template_uuid, recipients, metadata )  
  contract_doc_id = contract_resp?.data?.id;
  
  //TODO similarly for delivery document id
  
  /*****
    Use the callback function to output data that can be used in later actions in your workflow.
  *****/
  callback({
    outputFields: {
      document_id: contract_doc_id,
      contract_id: contract_ticket_id,
      contract_tax: tax_id
    }
  });
  
  if(error) throw new Error(error)
 }