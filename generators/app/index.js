'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const parentPackage = 'gov/ca/cwds/';
const templatePackage = parentPackage + 'template/';
const javaPath = 'src/main/java/';
const resourcesPath = 'src/main/resources/';
const tPath = javaPath + templatePackage;

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the doozie ' + chalk.red('generator-cwds-api') + ' generator!'
    ));

    const prompts = [{
      name: 'apiName',
      message: 'What will be your api\'s name ?'
    }, {
      name: 'apiDescription',
      message: 'What will be your api\'s description (short) ?'
    }, {
      name: 'apiPackage',
      message: 'What will be your api\'s package (without gov.ca.cwds) ?'
    }, {
      name: 'apiTeam',
      message: 'What is you team ?'
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      // this.props = props;
      this.props = {
        apiName:        props.apiName,
        apiDescription: props.apiDescription,
        apiCaps:        props.apiName.toUpperCase(),
        apiProper:      props.apiName.split(' ').map(w=>w[0].toUpperCase()+w.substr(1).toLowerCase()).join(' '),
        apiLower:       props.apiName.toLowerCase(),
        apiTeam:        props.apiTeam,
        apiPackage:     props.apiPackage.toLowerCase(),
        apiClass:       props.apiPackage.substr(0,1).toUpperCase()+props.apiPackage.substr(1).toLowerCase(),
        apiProjectName: props.apiName.toLowerCase().split(' ').join('-')

      };
  })
    ;
  }

  writing() {
    var contextT = this.props;
    var sPath = '';
    var dName = '';
    var apiPackagePath = contextT.apiPackage + '/';
    var dPath = javaPath + parentPackage + apiPackagePath;

    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copyTpl(
      this.templatePath('build.gradle'),
      this.destinationPath('build.gradle'), contextT
    );
    this.fs.copyTpl(
      this.templatePath('Dockerfile'),
      this.destinationPath('Dockerfile'), contextT
    );
    this.fs.copy(
      this.templatePath('entrypoint.sh'),
      this.destinationPath('entrypoint.sh')
    );
    this.fs.copy(
      this.templatePath('env.sample'),
      this.destinationPath('env.sample')
    );
    this.fs.copyTpl(
      this.templatePath('gradle.properties'),
      this.destinationPath('gradle.properties'), contextT
    );
    this.fs.copy(
      this.templatePath('gradlew'),
      this.destinationPath('gradlew')
    );
    this.fs.copy(
      this.templatePath('gradlew.bat'),
      this.destinationPath('gradlew.bat')
    );
    this.fs.copyTpl(
      this.templatePath('LICENSE'),
      this.destinationPath('LICENSE'), contextT
    );
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'), contextT
    );
    this.fs.copyTpl(
      this.templatePath('settings.gradle'),
      this.destinationPath('settings.gradle'), contextT
    );

    //Make forder structure
    //config

    var fPath = 'config/';
    var fName = 'shiro.ini';
    this.fs.copy(
      this.templatePath(fPath + fName),
      this.destinationPath(fPath + fName)
    );
    fName = 'shiro_nosec.ini';
    this.fs.copy(
      this.templatePath(fPath + fName),
      this.destinationPath(fPath + fName)
    );
    fName = 'shiro_v2.ini';
    this.fs.copy(
      this.templatePath(fPath + fName),
      this.destinationPath(fPath + fName)
    );
    fName = 'testKeyStore.jks';
    this.fs.copy(
      this.templatePath(fPath + fName),
      this.destinationPath(fPath + fName)
    );

    //todo:
    fName = 'template-api.yml';
    dName = contextT.apiProjectName+'-api.yml';
    this.fs.copyTpl(
      this.templatePath(fPath + fName),
      this.destinationPath(fPath + dName), contextT
    );


    //gradle/wrapper
    fPath = 'gradle/wrapper/';
    fName = 'gradle-wrapper.jar';
    this.fs.copy(
      this.templatePath(fPath + fName),
      this.destinationPath(fPath + fName)
    );
    fName = 'gradle-wrapper.properties';
    this.fs.copy(
      this.templatePath(fPath + fName),
      this.destinationPath(fPath + fName)
    );


    //src/main/resources/
    fPath = resourcesPath;
    fName = 'version.properties';
    this.fs.copy(
      this.templatePath(fPath + fName),
      this.destinationPath(fPath + fName)
    );



    //src/main/java/gov/ca/cwds/template/
    sPath = tPath;
    dPath = javaPath + parentPackage + apiPackagePath;

    fName = 'Constants.java';
    this.fs.copyTpl(
      this.templatePath(sPath + fName),
      this.destinationPath(dPath + fName), contextT
    );
    fName = 'Identifiable.java';
    this.fs.copyTpl(
      this.templatePath(sPath + fName),
      this.destinationPath(dPath + fName), contextT
    );
    fName = 'package-info.java';
    this.fs.copyTpl(
      this.templatePath(sPath + fName),
      this.destinationPath(dPath + fName), contextT
    );
    fName = 'RequestResponse.java';
    this.fs.copyTpl(
      this.templatePath(sPath + fName),
      this.destinationPath(dPath + fName), contextT
    );


    fName = 'BaseTemplateApiApplication.java';
    dName = 'Base'+contextT.apiClass+'ApiApplication.java'
    this.fs.copyTpl(
      this.templatePath(sPath + fName),
      this.destinationPath(dPath + dName), contextT
    );
    fName = 'TemplateApiApplication.java';
    dName = contextT.apiClass+'ApiApplication.java'
    this.fs.copyTpl(
      this.templatePath(sPath + fName),
      this.destinationPath(dPath + dName), contextT
    );
    fName = 'TemplateApiConfiguration.java';
    dName = contextT.apiClass+'ApiConfiguration.java'
    this.fs.copyTpl(
      this.templatePath(sPath + fName),
      this.destinationPath(dPath + dName), contextT
    );


    //src/main/java/gov/ca/cwds/template/auth/
    sPath = tPath + 'auth/';
    dPath = javaPath + parentPackage + apiPackagePath+'auth/';

    fName = 'PerryUserIdentity.java';
    this.fs.copyTpl(
      this.templatePath(sPath + fName),
      this.destinationPath(dPath + fName), contextT
    );

    //src/main/java/gov/ca/cwds/template/inject/
    sPath = tPath + 'inject/';
    dPath = javaPath + parentPackage + apiPackagePath+'inject/';

    fName = 'AbstractInjectProvider.java';
    this.fs.copyTpl(
      this.templatePath(sPath + fName),
      this.destinationPath(dPath + fName), contextT
    );

    fName = 'ApplicationModule.java';
    this.fs.copyTpl(
      this.templatePath(sPath + fName),
      this.destinationPath(dPath + fName), contextT
    );

    fName = 'FiltersModule.java';
    this.fs.copyTpl(
      this.templatePath(sPath + fName),
      this.destinationPath(dPath + fName), contextT
    );

    fName = 'InjectorHolder.java';
    this.fs.copyTpl(
      this.templatePath(sPath + fName),
      this.destinationPath(dPath + fName), contextT
    );

    fName = 'MappingModule.java';
    this.fs.copyTpl(
      this.templatePath(sPath + fName),
      this.destinationPath(dPath + fName), contextT
    );

    fName = 'ResourcesModule.java';
    this.fs.copyTpl(
      this.templatePath(sPath + fName),
      this.destinationPath(dPath + fName), contextT
    );

    fName = 'ServicesModule.java';
    this.fs.copyTpl(
      this.templatePath(sPath + fName),
      this.destinationPath(dPath + fName), contextT
    );


    //src/main/java/gov/ca/cwds/template/service/
    sPath = tPath + 'service/';
    dPath = javaPath + parentPackage + apiPackagePath+'service/';

    fName = 'CrudServiceAdapter.java';
    this.fs.copyTpl(
      this.templatePath(sPath + fName),
      this.destinationPath(dPath + fName), contextT
    );

    fName = 'package-info.java';
    this.fs.copyTpl(
      this.templatePath(sPath + fName),
      this.destinationPath(dPath + fName), contextT
    );

    fName = 'TypedCrudServiceAdapter.java';
    this.fs.copyTpl(
      this.templatePath(sPath + fName),
      this.destinationPath(dPath + fName), contextT
    );


    //src/main/java/gov/ca/cwds/template/service/dto/
    sPath = tPath + 'service/dto/';
    dPath = javaPath + parentPackage + apiPackagePath+'service/dto/';

    fName = 'BaseDTO.java';
    this.fs.copyTpl(
      this.templatePath(sPath + fName),
      this.destinationPath(dPath + fName), contextT
    );

    fName = 'CollectionDTO.java';
    this.fs.copyTpl(
      this.templatePath(sPath + fName),
      this.destinationPath(dPath + fName), contextT
    );

    //src/main/java/gov/ca/cwds/template/service/dto/system/
    sPath = tPath + 'service/dto/system/';
    dPath = javaPath + parentPackage + apiPackagePath+'service/dto/system/';

    fName = 'HealthCheckResultDTO.java';
    this.fs.copyTpl(
      this.templatePath(sPath + fName),
      this.destinationPath(dPath + fName), contextT
    );

    fName = 'SystemInformationDTO.java';
    this.fs.copyTpl(
      this.templatePath(sPath + fName),
      this.destinationPath(dPath + fName), contextT
    );

    //src/main/java/gov/ca/cwds/template/web/rest/
    sPath = tPath + 'web/rest/';
    dPath = javaPath + parentPackage + apiPackagePath+'web/rest/';

    fName = 'package-info.java';
    this.fs.copyTpl(
      this.templatePath(sPath + fName),
      this.destinationPath(dPath + fName), contextT
    );

    //src/main/java/gov/ca/cwds/template/web/rest/filters/
    sPath = tPath + 'web/rest/filters/';
    dPath = javaPath + parentPackage + apiPackagePath+'web/rest/filters/';

    fName = 'RequestExecutionContext.java';
    this.fs.copyTpl(
      this.templatePath(sPath + fName),
      this.destinationPath(dPath + fName), contextT
    );

    fName = 'RequestExecutionContextFilter.java';
    this.fs.copyTpl(
      this.templatePath(sPath + fName),
      this.destinationPath(dPath + fName), contextT
    );

    fName = 'RequestExecutionContextImpl.java';
    this.fs.copyTpl(
      this.templatePath(sPath + fName),
      this.destinationPath(dPath + fName), contextT
    );

    fName = 'RequestExecutionContextRegistry.java';
    this.fs.copyTpl(
      this.templatePath(sPath + fName),
      this.destinationPath(dPath + fName), contextT
    );

    fName = 'RequestResponseLoggingFilter.java';
    this.fs.copyTpl(
      this.templatePath(sPath + fName),
      this.destinationPath(dPath + fName), contextT
    );


    //src/main/java/gov/ca/cwds/template/web/rest/system/
    sPath = tPath + 'web/rest/system/';
    dPath = javaPath + parentPackage + apiPackagePath+'web/rest/system/';

    fName = 'SystemInformationResource.java';
    this.fs.copyTpl(
      this.templatePath(sPath + fName),
      this.destinationPath(dPath + fName), contextT
    );



  }

  install() {
    // this.installDependencies();
  }
};
