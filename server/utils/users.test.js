const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Kartik',
      room: 'CS GO'
    }, {
      id: '2',
      name: 'Nikhil',
      room: 'PUBG'
    }, {
      id: '3',
      name: 'KD',
      room: 'CS GO'
    }]
  });

  it('should add new user', () => {
      var users = new Users();
      var user = {
        id: '123',
        name: 'Kartik',
        room: 'CS GO'
      }
      var resUser = users.addUser(user.id, user.name, user.room);

      expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    var id = '3';
    var user = users.removeUser(id);

    expect(user.id).toBe(id);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    var id = '123546';
    var user = users.removeUser(id);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    var id = '2';
    var user = users.getUser(id);

    expect(user.id).toBe(id);
  });

  it('should not find user', () => {
    var id = '99815';
    var user = users.getUser(id);

    expect(user).toNotExist();
  });

  it('should return names for CS GO', () => {
    var userList = users.getUserList('CS GO');

    expect(userList).toEqual(['Kartik','KD']);
  });

  it('should return names for PUBG', () => {
    var userList = users.getUserList('PUBG');

    expect(userList).toEqual(['Nikhil']);
  });

});
