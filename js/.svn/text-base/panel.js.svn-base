Ext.onReady(function() {

	// Note: For the purposes of following along with the tutorial, all 
	// new code should be placed inside this method.  Delete the following
	// line after you have verified that Ext is installed correctly.
	Ext.QuickTips.init();
	var font = 'font-size: 14px;';
	new Ext.Toolbar({
		renderTo : 'bar',
		items : [{
			xtype : 'tbbutton',
			cls : 'x-btn-text-icon',
			icon : 'images/calc.png',
			text : 'Transaction',
			
			
			menu : [{
				xtype : 'tbbutton',
				cls : 'x-btn-text-icon',
				icon : 'images/new.png',
				text : 'Nouvelle transaction',
				style: font,
				handler: newTrans
			},
			{
				xtype : 'tbbutton',
				cls : 'x-btn-text-icon',
				icon : 'images/edit.png',
				text : 'Voir transaction',
				style: font,
				handler: seeTrans
			},
			{
				xtype : 'tbbutton',
				text : 'Souper',
				cls : 'x-btn-text-icon',
				icon : 'images/souper.png',
				style: font,
				handler : souper
			}]
		},
		{
			xtype : 'tbspacer'
		},
		{
			xtype : 'tbbutton',
			cls : 'x-btn-text-icon',
			icon : 'images/profile.png',
			text : 'Profil',
			style : font,
			
			menu : [{
				xtype : 'tbbutton',
				style: font,
				cls : 'x-btn-text-icon',
				icon : 'images/mdp.png',
				text : 'Changer son mot de passe',
				handler: changeMdp
				
			}]
		},
		{
			xtype : 'tbfill'
		},	
		{
			xtype : 'tbbutton',
			cls : 'x-btn-text-icon',
			icon : 'images/deco.png',
			text : 'Déconnexion',
			handler : function() {
	  			var redirect = 'index.jsp?deco=true'; 
	  			window.location = redirect;
  			}
		}]
	});
	



});

