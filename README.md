# n8n-nodes-sellsy

This is an n8n community node. It lets you interact with Sellsy in your n8n workflows.

Sellsy is a French CRM and invoicing platform for small and medium businesses: teams manage their companies, contacts and opportunities, send estimates and invoices, follow payments and subscriptions, keep their product catalog and accounting settings, and track tasks, calls and calendar events in one place.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)
[Credentials](#credentials)
[Operations](#operations)
[Pagination](#pagination)
[File uploads](#file-uploads)
[Trigger node](#trigger-node)
[Using as a Tool](#using-as-a-tool)
[Compatibility](#compatibility)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

Alternatively, you can manually install it:

```sh
git clone https://github.com/agaudin-alt/n8n-nodes-sellsy.git
cd n8n-nodes-sellsy
npm install
```

Then, place the node file in the `~/.n8n/custom-nodes` directory (or follow instructions specific to your n8n installation).

## Credentials

This node covers version 2 of the Sellsy API and authenticates with **Sellsy OAuth2 API** (client credentials).

In Sellsy, go to *Menu → Settings → Developer Portal → API V2* and create an API access of type **Personal**. Only this type supports the client credentials flow: a **Private** access requires an authorization code with PKCE, and a **Public** access is reserved to Sellsy partners. Link the access to a staff member (preferably an administrator, since the token gets the rights of its creator), tick the scopes you need (all of them for full access), then paste the **Client ID** and **Client Secret** into the n8n credential. The client secret is shown only once.

Each operation's required scope is listed in the [Sellsy API reference](https://docs.sellsy.com/api/v2/).

## Operations

This node supports the following 423 operations within Sellsy:

* **Account Subscription**
    - Get my sellsy subscription informations
* **Accounting**
    - Create an accounting code
    - Delete an accounting code
    - Export accounting journal
    - Get accounting charts settings
    - Get accounting codes
    - Get accounting journal
    - Get meta informations for accounting journal
    - Search accounting codes
    - Search accounting journal
    - Update accounting charts settings
* **Activity**
    - Search in activity
    - Timeline search
* **Address**
    - List account addresses
* **API Management**
    - Delete o auth client
    - Get o auth client
    - Get scopes tree
    - List o auth clients
    - Scopes list
* **Assigned Staff Label**
    - List assigned staff labels
* **Bank Account**
    - List bank accounts
* **Batch**
    - Batch request
* **Calendar**
    - Calendar events list
    - Create a calendar event
    - Delete calendar event
    - Get calendar event
    - Get calendar events labels
    - List provider calendars
    - Search calendar event
    - Update calendar event
* **Check Label**
    - List check labels
* **Comment**
    - Comments list
    - Create a comment
    - Delete a comment
    - Get comment details
    - Search comments
    - Update a comment
* **Company**
    - Attach file to a company
    - Companies list
    - Company custom fields list
    - Company smart tags list
    - Convert prospect company to client company
    - Create a company
    - Create a company address
    - Delete a company address
    - Delete company
    - Export companies
    - Get a company address
    - Get a company contacts
    - Get company
    - Get company addresses
    - Link a contact at one company
    - Link smart tags to company
    - List companies favourite filters
    - List directories and files of a company
    - Record payment on a company
    - Search companies
    - Unlink a contact of company
    - Update a company address
    - Update a contact of company link
    - Update company
    - Update company custom fields
* **Conformity**
    - Activate invoice conformity definitively
    - Retrieve invoicing conformity state
* **Contact**
    - Attach file to a contact
    - Companies contact
    - Contact custom fields list
    - Contact smart tags list
    - Contacts list
    - Create a contact
    - Create a contact address
    - Delete a contact address
    - Delete contact
    - Export contacts
    - Get a contact address
    - Get contact
    - Get contact addresses
    - Link smart tags to contact
    - List contacts favourite filters
    - List directories and files of a contact
    - Search contacts
    - Update a contact address
    - Update contact
    - Update contact custom fields
* **Country**
    - Get countries list
* **Credit Note**
    - Attach file to an credit note
    - Compute a credit note
    - Create credit note
    - Credit note custom fields list
    - Credit note payments list
    - Credit note smart tags list
    - Credit notes list
    - Get credit note
    - Get invoices linked to credit note
    - Link an invoice to a credit note
    - Link discount including taxes to credit note
    - Link payment to credit note
    - Link prime to credit note deprecated
    - Link smart tags to credit note
    - List credit notes favourite filters
    - List directories and files of a credit note
    - Search credit notes
    - Unlink a discount including taxes from a credit note
    - Unlink a prime from a credit note deprecated
    - Unlink an invoice from a credit note
    - Unlink payment from credit note
    - Update credit note
    - Update credit note custom fields
    - Validate credit note
* **CRM Activity**
    - Export the CRM activity
    - Get meta informations for activity
    - Get the CRM activity
    - Search in CRM activity
* **Currency**
    - Get currencies
* **Custom Activity**
    - Create custom activity
    - Create custom activity type
    - Custom activity types list
    - Customs activities list
    - Delete custom activity
    - Get custom activity
    - Get custom activity type
    - Search custom activities
    - Update custom activity
    - Update custom activity type
* **Custom Field**
    - Custom fields list
    - Custom fields search
    - Get custom field
* **Delivery**
    - Get all deliveries
    - Get delivery
    - Search deliveries
* **Deposit Invoice**
    - Attach file to a deposit invoice
    - Compute a deposit invoice
    - Create a deposit invoice
    - Create a deposit invoice quickly
    - Deposit payments list
    - Get a deposit invoice
    - Get credit notes linked to a deposit invoice
    - Get deposit invoice custom fields
    - Get smart tags for a deposit invoice
    - Link payment to deposit invoice
    - Link smart tags to deposit invoice
    - List deposit invoices
    - List directories and files of a deposit invoice
    - Prepare a deposit invoice
    - Search deposit invoices
    - Unlink payment from deposit invoice
    - Update a deposit invoice
    - Update deposit invoice custom fields
    - Validate deposit invoice
* **Discount Including Tax**
    - Create a discount including taxes
    - Delete a discount including taxes
    - Get a discount including taxes
    - Get list of discounts including taxes
    - Get list of primes deprecated
    - Update a discount including taxes
* **Document**
    - Get your invoices and credit notes
* **Document Layout**
    - Get all document layouts
* **Document Model**
    - Convert a document model into a document
    - Create a document model
    - Delete document model
    - Get available tags for document models
    - Get document model
    - List document models
    - Search document models
    - Update document model
* **Email**
    - Get available tags for email signature settings
    - Get available tags for email templates
    - Get email
    - Get email settings
    - Get email template
    - Get email s domain dns data
    - Get emails thread
    - Get list of your email templates
    - Get system email template with content
    - Get your email template with context
    - Send email
    - Update email settings
    - Upload file for email
    - Validate email s dns
* **Estimate**
    - Attach file to an estimate
    - Cancel esign for estimate
    - Compute an estimate
    - Create esign for estimate
    - Create estimate
    - Estimate custom fields list
    - Estimate payments list
    - Estimate smart tags list
    - Export estimates
    - Get all estimates
    - Get an estimate
    - Get esign for estimate
    - Link discount including taxes to estimate
    - Link payment to estimate
    - Link prime to estimate deprecated
    - Link smart tags to estimate
    - List directories and files of an estimate
    - List estimates favourite filters
    - Search estimates
    - Unlink a discount including taxes from an estimate
    - Unlink a prime from an estimate deprecated
    - Unlink payment from estimate
    - Update estimate
    - Update estimate custom fields
    - Update estimate status
* **File**
    - Attach file to a directory
    - Create directory
    - Delete file
    - Delete the directory and all items attached
    - Get directory
    - Get file
    - List directories and files in a directory
    - Move a file to a new directory
    - Update directory
* **Fiscal Year**
    - Get fiscal years
* **Individual**
    - Attach file to an individual
    - Convert prospect individual to client individual
    - Create an individual
    - Create an individual address
    - Delete an individual address
    - Delete individual
    - Get an individual address
    - Get an individual contacts
    - Get individual
    - Get individual addresses
    - Individual custom fields list
    - Individual smart tags list
    - Individuals list
    - Link smart tags to individual
    - List directories and files of an individual
    - List individuals favourite filters
    - Record payment on an individual
    - Search individuals
    - Update an individual address
    - Update individual
    - Update individual custom fields
* **Invoice**
    - Attach file to an invoice
    - Compute an invoice
    - Create invoice
    - Export invoices
    - Get credit notes linked to invoice
    - Get invoice
    - Invoice custom fields list
    - Invoice payments list
    - Invoice smart tags list
    - Invoices list
    - Link a credit note to an invoice
    - Link discount including taxes to invoice
    - Link payment to invoice
    - Link prime to invoice deprecated
    - Link smart tags to invoice
    - List directories and files of an invoice
    - List invoices favourite filters
    - Search invoices
    - Unlink a credit note from an invoice
    - Unlink a discount including taxes from an invoice
    - Unlink a prime from an invoice deprecated
    - Unlink payment from invoice
    - Update invoice
    - Update invoice custom fields
    - Validate invoice
* **Item**
    - Create an item
    - Declinations list
    - Delete item
    - Get an item
    - Get item declination prices
    - Get item prices
    - Item custom fields list
    - Items list
    - List items favourite filters
    - Search barcodes
    - Search declinations
    - Search items
    - Update an item
    - Update item custom fields
    - Update item prices
* **Language**
    - Get the account languages
* **Listing**
    - Export the exports list
    - Get an export status
    - List exports
    - Reschedule an export
    - Search
    - Search exports
    - Update an export
* **Notification**
    - Delete notification
    - Get notifications settings
    - Get user notifications
    - Mark all unread notifications as read
    - Mark notification as read
    - Search user notifications
    - Update notifications settings
* **Opportunity**
    - Attach file to an opportunity
    - Create an opportunity
    - Delete an opportunity
    - Export opportunities
    - Get opportunities
    - Get opportunities categories list
    - Get opportunities category
    - Get opportunity
    - Get opportunity category sources
    - Get opportunity pipeline steps
    - Get opportunity pipelines
    - Get opportunity sources
    - Link smart tags to opportunity
    - List directories and files of an opportunity
    - List opportunities favourite filters
    - Opportunity custom fields list
    - Opportunity smart tags list
    - Partially update opportunity
    - Search all opportunity pipeline steps
    - Search opportunities
    - Search opportunity pipeline steps
    - Search opportunity pipelines
    - Search opportunity sources
    - Update opportunity
    - Update opportunity custom fields
    - Update opportunity s rank and or step
* **Order**
    - Attach file to an order
    - Cancel esign for order
    - Compute an order
    - Create an order
    - Create esign for order
    - Get all orders
    - Get esign for order
    - Get order
    - Link discount including taxes to order
    - Link payment to order
    - Link prime to order deprecated
    - Link smart tags to an order
    - List directories and files of an orders
    - List orders favourite filters
    - Order custom fields list
    - Order payments list
    - Order smart tags list
    - Search orders
    - Unlink a discount including taxes from an order
    - Unlink a prime from an order deprecated
    - Unlink payment from order
    - Update an order
    - Update order custom fields
* **Payment**
    - Delete payment
    - Get a payment
    - Get go cardless mandates
    - Get payments
    - Get the payment method
    - Get timeline of a go cardless directdebit
    - List of all payment methods
    - Search go cardless mandates
    - Search methods of payment
    - Search payments
* **Payment Term**
    - List payment terms
* **Phone Call**
    - Create a phonecall
    - Delete a phone call
    - Get a phone call
    - Phone calls list
    - Search phone calls
    - Update a phone call
* **Proforma Invoice**
    - Proforma invoice custom fields list
* **Progress Invoice**
    - Compute a progress invoice
    - Create a progress invoice
    - Update a progress invoice
* **Proposal**
    - Cancel esign for proposal document
    - Create esign for proposal document
    - Generate a proposal document
    - Get esign for proposal document
    - Get proposal document
    - Get proposal model
    - List proposal models
    - Search proposal models
* **Purchase**
    - Get metadata for purchase invoice ocr
    - Ocr list purchase invoices
    - Search ocr purchase invoices
* **Quota**
    - Get quotas
* **Rate Category**
    - Create rate category
    - Delete rate category
    - Get rate category
    - Rate categories list
    - Update a rate category
* **Smart Tag**
    - Delete a smart tags
    - Smart tags autocomplete
* **Staff**
    - Create a staff
    - Delete licenses
    - Get staff
    - Get staffs
    - Profiles list
    - Put staff licenses
    - Search staffs
    - Team list
    - Update staff
* **Subscription**
    - Add payment installment for a subscription
    - Create a subscription
    - Delete a payment installment for a subscription
    - Delete a subscription
    - Fetch list of subscriptions
    - Get all payment installments of subscriptions
    - Get subscription
    - Search payment installments of subscriptions
    - Search subscriptions
    - Update a payment installment for a subscription
    - Update a subscription
* **Task**
    - Create a task
    - Delete a task
    - Get a task
    - Get tasks labels
    - Search tasks
    - Tasks list
    - Update a task
* **Tax**
    - Create tax
    - Delete tax
    - Get tax
    - Search taxes
    - Tax accounting codes list
    - Taxes accounting codes list
    - Taxes list
    - Update tax
    - Update tax accounting codes
* **Unit**
    - Get units
* **Webhook**
    - Create webhook
    - Delete webhook
    - Get webhook
    - Get webhooks
    - List webhook events
    - Search webhooks
    - Update webhook

Retrieve information from the [Sellsy API v2](https://docs.sellsy.com/api/v2/).

Some resources depend on Sellsy modules that are not included in every plan (orders, subscriptions, deliveries, GoCardless mandates): on an account without the module, Sellsy answers 403. Operations marked *(Deprecated)* are deprecated by Sellsy.

## Pagination

List and search operations offer **Return All** and **Limit**. With **Return All**, the node follows Sellsy's "seek" pagination for you: each response carries in `pagination.offset` the cursor of the next page, and the node keeps every other parameter (embed, field, order, filters) while it collects the pages, 100 items at a time.

## File uploads

Eleven operations upload a file instead of sending JSON, and expect binary data on the input item (for example `Company → Attach file to a company` or `Invoice → Attach file to an invoice`). Set **Input Binary Field** to the name of the binary property holding the file (`data` by default).

## Trigger node

**Sellsy Trigger** starts a workflow when the selected Sellsy events happen (company created, estimate status changed, invoice paid...). The list of events is loaded from `GET /webhooks/events`. When the workflow is activated, the node registers its webhook in Sellsy, and removes it when the workflow is deactivated. Sellsy must be able to reach your n8n webhook URL from the internet.

## Using as a Tool

This node can be used as a tool in n8n AI Agents. To enable community nodes as tools, you need to set the `N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE` environment variable to `true`.

### Setting the Environment Variable

**If you're using a bash/zsh shell:**
```bash
export N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true
n8n start
```

**If you're using Docker:**
Add to your docker-compose.yml file:
```yaml
environment:
  - N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true
```

**If you're using the desktop app:**
Create a `.env` file in the n8n directory:
```
N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true
```

**If you want to set it permanently on Mac/Linux:**
Add to your `~/.zshrc` or `~/.bash_profile`:
```bash
export N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true
```

## Compatibility

- Tested with: n8n 2.42.4

The 423 operations have been exercised against the live API on a Sellsy trial account: 264 completed successfully, the others returned a Sellsy response that confirms the route and the authentication (validation error on test data, module missing from the trial account, or not found on a dummy ID). The Sellsy Trigger was tested end to end through a public tunnel. One operation was not called on purpose: `Conformity → Activate invoice conformity definitively`, which registers the account for e-invoicing.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Sellsy API v2 documentation](https://docs.sellsy.com/api/v2/)
- [Sellsy API access types](https://help.sellsy.com/fr/articles/5876615-types-d-acces-api)
